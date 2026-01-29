import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const SPREADSHEET_ID = "1v5fJ56LBZZTYkMCfp7XAS4JDfsiZbR4JF8z-7YMPAdI";
const KEY_FILE_PATH = path.join(__dirname, "service-account.json");

async function fetchExternalTours() {
  let auth;

  if (process.env.GOOGLE_CREDENTIALS) {
    auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: SCOPES,
    });
  } else {
    auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: SCOPES,
    });
  }

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetName = sheetMetadata.data.sheets?.[0]?.properties?.title;

    if (!sheetName) {
      throw new Error("No sheets found in the spreadsheet");
    }

    const rangeName = `'${sheetName}'!A:Z`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: rangeName,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    const headers = rows[0].map((h: string) => h.trim());
    const data = rows.slice(1).map((row) => {
      const tour: any = {};

      headers.forEach((header: string, index: number) => {
        let key = header;
        const normalizedHeader = header.toLowerCase().replace(/[^a-z0-9]/g, "");

        if (normalizedHeader.includes("id") && normalizedHeader.length === 2) key = "id";
        else if (normalizedHeader.includes("tourname")) key = "tourName";
        else if (normalizedHeader.includes("cityfrom")) key = "cityFrom";
        else if (normalizedHeader.includes("cityto")) key = "cityTo";
        else if (normalizedHeader.includes("startdate")) key = "startDate";
        else if (normalizedHeader.includes("day") || normalizedHeader.includes("duration")) key = "day";
        else if (normalizedHeader.includes("price")) key = "price";
        else if (normalizedHeader.includes("currency")) key = "currency";
        else if (normalizedHeader.includes("hotelcategory") || normalizedHeader.includes("stars")) key = "hotelCategory";
        else if (normalizedHeader.includes("hoteldistance")) key = "hotelDistance";
        else if (normalizedHeader.includes("flight")) key = "flightIncluded";
        else if (normalizedHeader.includes("visa")) key = "visaIncluded";
        else if (normalizedHeader.includes("food") || normalizedHeader.includes("meal")) key = "foodIncluded";
        else if (normalizedHeader.includes("transfer")) key = "transferIncluded";
        else if (normalizedHeader.includes("ziyarat")) key = "ziyarateIncluded";
        else if (normalizedHeader.includes("guide")) key = "guideIncluded";
        else if (normalizedHeader.includes("active")) key = "isActive";
        else if (normalizedHeader.includes("priority")) key = "priority";
        else if (normalizedHeader.includes("soldout") || normalizedHeader.includes("seats")) key = "availableSeats";
        else if (normalizedHeader.includes("typetour") || normalizedHeader.includes("type")) key = "typeTour";
        else if (normalizedHeader.includes("img") || normalizedHeader.includes("image") || normalizedHeader.includes("photo")) key = "imageUrl";

        let value: any = row[index];
        if (value === undefined) return;

        if (key === "id" || key === "day" || key === "price" || key === "hotelCategory" || key === "hotelDistance" || key === "priority" || key === "availableSeats") {
          value = Number(value?.toString().replace(/[^0-9.-]+/g, ""));
        } else if (key.endsWith("Included") || key === "isActive") {
          const v = value?.toString().toLowerCase();
          value = v === "true" || v === "yes" || v === "1" || v === "иә" || v === "да";
        }

        tour[key] = value;
      });

      return tour;
    });

    return data;
  } catch (error) {
    throw new Error("Failed to fetch from Google Sheets");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/tours", async (_req, res) => {
    try {
      const tours = await fetchExternalTours();
      res.json(tours);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
