import speech from "@google-cloud/speech";
import { v2 as Translate } from "@google-cloud/translate";

import fs from "fs";
import path from "path";


const key = path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
const client = new speech.SpeechClient({
  keyFilename: key
});

const translate = new Translate.Translate({
  keyFilename: key
});

export async function transcribeAudio(audioFilePath: string, inputLanguage: string, targetLanguage: string): Promise<string> {
  try {
    const file = fs.readFileSync(audioFilePath);
    const audioBytes = file.toString("base64");

    const request = {
      audio: { content: audioBytes },
      config: {
        // encoding: "OGG_OPUS",  // Use "OGG_OPUS" for WebM/Opus
        languageCode: inputLanguage,
        model: "medical_dictation",
      },
    };
    console.log()
    const [response] = await client.recognize(request as any);
    const transcript = response.results?.map(r => r.alternatives[0].transcript).join(" ") || "";

    if (!transcript) {
      throw new Error("No transcription result");
    }

    // Translate API Call
    const [translation] = await translate.translate(transcript, targetLanguage);
    return `input text: ${transcript}\n output text:${translation}\n`
  } catch (error) {
    console.error("Transcription Error:", error);
    return "Error transcribing audio";
  }
}
