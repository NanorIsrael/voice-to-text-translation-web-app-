import { v2 as Translate } from "@google-cloud/translate";

const translate = new Translate.Translate();

export function useTranslator(){
    return translate
}
 