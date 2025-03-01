import { transcribeAudio } from "@/lib/speechToText";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const inputLangCode = formData.get("inputLang") as string;
    const outputLangCode = formData.get("outputLang") as string;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }
	// "/tmp"
    // Save the file temporarily
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const filePath = path.join("/tmp", audioFile.name);
    await fs.writeFile(filePath, buffer as  any);

    // Transcribe the saved audio file
    const result = await transcribeAudio(filePath, inputLangCode.trim(), outputLangCode.trim());
    return NextResponse.json(result);
  } catch (error) {
	console.log(error)
    return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
  }
}

