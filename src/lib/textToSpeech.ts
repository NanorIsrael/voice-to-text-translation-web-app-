import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import path from "path";
import util from "util";

const key = path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: key
});

export async function synthesizeSpeech(text: string, languageCode: string) {
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "LINEAR16" },
  };

  const [response] = await client.synthesizeSpeech(request as any);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.wav", response.audioContent as any );
  return `/output.wav`;
}
// ArrayBufferView<ArrayBufferLike>