import { translateText } from "@/lib/translateText";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json();
  const translated = await translateText(text, targetLanguage);
  Response.json({ text: translated });
}
