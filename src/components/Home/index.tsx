"use client";
import { useEffect, useState } from "react";
import CustomSelect from "../Common/CustomSelect";
import { languageCode } from "./languages";

export default function VoiceRecorder() {
  const [transcript, setTranscript] = useState("");
  const [translated, setTranslated] = useState("");
  const [recording, setRecording] = useState(false);
  const [selectedInputLang, setSelectedInputLang] = useState("English (US)");
  const [selectedOuputputLang, setSelectedOutputLang] = useState("English (US)");
  
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
    <div className="p-4 bg-[#000]">
    <div className="grid grid-cols-3 gap-4 h-screen p-4 overflow-scroll">
      <div className="col-span-1 bg-dark p-4 rounded-lg overflow-scroll">
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
          {recording ? "Recording..." : "Speak"}
        </button>
      </div>


      <div className="col-span-2 bg-dark  p-4 rounded-lg">
      {transcript && <p className="mt-4">Transcript: {transcript}</p>}
      </div>
    </div>
      
    </div>
  );
}
