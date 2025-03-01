import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import path from "path";
import util from "util";

const base64Key = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!base64Key) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS_BASE64 is not defined.");
}

// Decode and write to a temporary file
const credentialsPath = path.join("/tmp", "gcloud-key.json");
fs.writeFileSync(credentialsPath, Buffer.from(base64Key, "base64") as any);

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: credentialsPath
});

export async function synthesizeSpeech(text: string, languageCode: string) {
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "LINEAR16" },
  };

  const [response] = await client.synthesizeSpeech(request as any);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("/tmp/output.wav", response.audioContent as any );
  return `/output.wav`;
}
// ArrayBufferView<ArrayBufferLike>