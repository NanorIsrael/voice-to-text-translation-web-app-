"use client";

import { useTranslator } from "@/app/_utils/utils";
import { useEffect, useState } from "react";


export default function VoiceRecorder() {
  const [transcript, setTranscript] = useState("");
  const [translated, setTranslated] = useState("");
  const [recording, setRecording] = useState(false);

  let mediaRecorder: MediaRecorder;
  let audioChunks: Blob[] = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.wav");

      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

    const data = await response.json();
      setTranscript( data.text || "Error transcribing audio.");
    };

    mediaRecorder.start();
    setRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000); // Record for 5 seconds
  };

  // useEffect(() => {

  //   const translator = async () => {
  //     setTranslated(translation)
  //   }
  //   if (transcript) {
  //     translator()
  //   }
  // }, [transcript])

  return (
    <div className="p-4">
      <button onClick={startRecording} className="bg-blue-500 text-white px-4 py-2 rounded">
        {recording ? "Recording..." : "Speak"}
      </button>
      {transcript && <p className="mt-4">Transcript: {transcript}</p>}
    </div>
  );
}
