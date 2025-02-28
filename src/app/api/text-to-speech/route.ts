import { synthesizeSpeech } from "@/lib/textToSpeech";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, languageCode } = JSON.parse(req.body);
  const audioFile = await synthesizeSpeech(text, languageCode);
  res.json({ audio: `/output.mp3` });
}
