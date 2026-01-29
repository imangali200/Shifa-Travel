import { db } from "./db";
import { inquiries, type InsertInquiry, type Inquiry } from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private inquiries: Inquiry[] = [];
  private currentId: number = 1;

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = {
      ...insertInquiry,
      id: this.currentId++,
      message: insertInquiry.message ?? null,
      createdAt: new Date(),
    };
    this.inquiries.push(inquiry);
    return inquiry;
  }
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    if (!db) {
      throw new Error("Database not initialized");
    }
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
