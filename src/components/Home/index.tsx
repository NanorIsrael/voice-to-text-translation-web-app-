"use client";
import { useEffect, useState } from "react";
import CustomSelect from "../Common/CustomSelect";
import { languageCode } from "./languages";
import { OutputI } from "@/lib/speechToText";
import path from "path";

export default function VoiceRecorder() {
  const [transcript, setTranscript] = useState<null | OutputI>(null);
  const [recording, setRecording] = useState(false);
  const [selectedInputLang, setSelectedInputLang] = useState("English (US)");
  const [selectedOuputputLang, setSelectedOutputLang] = useState("English (US)");
  const [audioUrl, setAudioUrl] = useState("");

  const options = Object.keys(languageCode).sort();

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
      formData.append("inputLang", languageCode[selectedInputLang]);
      formData.append("outputLang", languageCode[selectedOuputputLang]);

      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setTranscript( data || "Error transcribing audio.");
    };

    mediaRecorder.start();
    setRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000); // Record for 5 seconds
  };

  const handleSpeechGenerator = async () => {
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript.outputText, languageCode: languageCode[selectedOuputputLang] }),
      });
      const data = await response.json();
      setAudioUrl(data.filename)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="p-4 bg-[#000]">
    <div className="grid md:grid-cols-3 gap-4 h-screen p-4 overflow-scroll">
      <div className="col-span-3 row-span-1 md:row-span-full md:md:col-span-1 bg-dark p-4 rounded-lg overflow-scroll">
        <form onSubmit={null}>
        <div className="w-full">
          <label htmlFor="input" className="block mb-2.5">
            Input Language <span className="text-red">*</span>
          </label>
           <CustomSelect options={options} selectedOption={selectedInputLang} setSelectedOption={setSelectedInputLang}/>
        </div>
      
        <div className="mt-4 w-full">
          <label htmlFor="output" className="block mb-2.5">
            Output Language <span className="text-red">*</span>
          </label>
           <CustomSelect options={options} selectedOption={selectedOuputputLang} setSelectedOption={setSelectedOutputLang}/>
        </div>
        </form>

        <button onClick={startRecording} className="bg-[#000] text-white px-4 py-2 rounded w-full mt-4">
          {recording ? "Recording..." : "Start Recording"}
        </button>
      </div>


      <div className="col-span-3 row-span-3 md:row-span-full md:col-span-2 bg-dark  p-4 rounded-lg">
       {transcript &&
       <div className="flex flex-col justify-between">
        <div className="justify-start w-[50%]">
          <div className="mt-4">
            <span className="block text-green">You</span>
            <p className="mt-2">{transcript.inputText}</p>
          </div>
            <div className="mt-4">
              <audio controls>
                <source src={"/api/text-to-speech?type=input"} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>  
          </div>
        </div>

        <div className="min-w-[30%] self-end mt-4">
          <div className="w-full self-start ">
            <span className="block text-green">Translated</span>
            <p className="mt-2">{transcript.outputText}</p>
          </div>
            <button className="bg-[#000] p-2 rounded-md w-[80px] mt-2" onClick={handleSpeechGenerator}>
              Speak
            </button>
            {
              audioUrl &&
              <div className="mt-4">
              <audio controls>
                <source src={`/api/text-to-speech?type=output`} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>  
          </div>
            }
        </div>
        </div>
       }
      </div>
    </div> 
      
    </div>
  );
}
