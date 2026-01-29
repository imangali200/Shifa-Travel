import { createApp } from "../server/app";
import type { VercelRequest, VercelResponse } from "@vercel/node";

let app: any = null;

async function getApp() {
    if (!app) {
        const { app: expressApp } = await createApp();
        app = expressApp;
    }
    return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const expressApp = await getApp();
    expressApp(req, res);
}
