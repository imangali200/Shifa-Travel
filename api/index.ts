import { createApp } from "../server/app";

let app: any = null;

async function getApp() {
    if (!app) {
        const { app: expressApp } = await createApp();
        app = expressApp;
    }
    return app;
}

export default async function handler(req: any, res: any) {
    const expressApp = await getApp();
    expressApp(req, res);
}
