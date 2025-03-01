import { synthesizeSpeech } from "@/lib/textToSpeech";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req: Request) {
  const filePath = path.join("/tmp", "audio.wav"); // Path to your audio file
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    if (type === "input") {
      const file = fs.readFileSync(filePath);
      return new Response(file, {
        headers: {
          "Content-Type": "audio/wav",
          "Content-Disposition": "inline",
        },
      });
    } else {
       const outFilePath = path.join("/tmp", "output.wav"); // Path to your audio file
        const file = fs.readFileSync(outFilePath);
        return new Response(file, {
          headers: {
          "Content-Type": "audio/wav",
          "Content-Disposition": "inline",
          },
        });
    }
   
  } catch (error) {
    return new Response("File not found", { status: 404 });
  }
}

export async function POST(req: Request) {
  try {
    const { text, languageCode } = await req.json();
    
    // Generate the audio file
    const filename = await synthesizeSpeech(text, languageCode);
    
    return NextResponse.json({ filename: filename }); // Ensure correct file path
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}