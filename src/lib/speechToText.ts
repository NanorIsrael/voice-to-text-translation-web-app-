import speech from "@google-cloud/speech";
import { v2 as Translate } from "@google-cloud/translate";

import fs from "fs";
import path from "path";

const base64Key = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!base64Key) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS_BASE64 is not defined.");
}

// Decode and write to a temporary file
const credentialsPath = path.join("/tmp", "gcloud-key.json");
fs.writeFileSync(credentialsPath, Buffer.from(base64Key, "base64") as any);

const client = new speech.SpeechClient({
  keyFilename: credentialsPath
});

const translate = new Translate.Translate({
  keyFilename: credentialsPath
});

export interface OutputI {
  inputText: string
  outputText: string
}
export async function transcribeAudio(
  audioFilePath: string, 
  inputLanguage: string,
  targetLanguage: string
): Promise<OutputI> {
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
    const [response] = await client.recognize(request as any);
    const transcript = response.results?.map(r => r.alternatives[0].transcript).join(" ") || "";

    if (!transcript) {
      throw new Error("No transcription result");
    }

    // Translate API Call
    const [translation] = await translate.translate(transcript, targetLanguage);
    return {
      inputText: transcript,
      outputText: translation
    }
  } catch (error) {
    console.error("Transcription Error:", error);
    return {
      inputText: "Error transcribing audio",
      outputText: "Error transcribing audio"
    }
  }
}
