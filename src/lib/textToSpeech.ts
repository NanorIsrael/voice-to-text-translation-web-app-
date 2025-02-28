import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";

const client = new textToSpeech.TextToSpeechClient();

export async function synthesizeSpeech(text: string, languageCode: string) {
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request as any);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent as any );
  return "output.mp3";
}
// ArrayBufferView<ArrayBufferLike>