import { Translate } from "@google-cloud/translate/build/src/v2";

const translate = new Translate();

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const [translatedText] = await translate.translate(text, targetLanguage);
  return translatedText;
}
