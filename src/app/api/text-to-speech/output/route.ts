
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join("/tmp", "output.wav"); // Path to your audio file

  try {
	const file = fs.readFileSync(filePath);
	return new Response(file, {
	  headers: {
		"Content-Type": "audio/wav",
		"Content-Disposition": "inline",
	  },
	});
  } catch (error) {
	console.log(error)
	return new Response("File not found", { status: 404 });
  }
}
