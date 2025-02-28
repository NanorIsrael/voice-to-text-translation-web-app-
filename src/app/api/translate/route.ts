import { translateText } from "@/lib/translateText";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, targetLanguage } = JSON.parse(req.body);
  const translated = await translateText(text, targetLanguage);
  res.json({ text: translated });
}
