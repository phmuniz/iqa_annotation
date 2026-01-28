"use client"

import data from "../public/data.json"
import { useState } from "react";
import Image from "next/image";
import Header from "./components/header";
import { arrowRight, arrowLeft } from "./icons";
import InputGrade from "./components/inputGrade";

export default function Home() {

  const [dataJSON, setDataJSON] = useState<Record<string, any>>(data);
  const [imgsList] = useState<string[]>(() => Object.keys(dataJSON));
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [blurGrade, setBlurGrade] = useState<number>(dataJSON[imgsList[currentImgIndex]].blur || 1);
  const [brightnessGrade, setBrightnessGrade] = useState<number>(dataJSON[imgsList[currentImgIndex]].brightness || 1);
  const [distanceGrade, setDistanceGrade] = useState<number>(dataJSON[imgsList[currentImgIndex]].distance || 1);
  const [framingGrade, setFramingGrade] = useState<number>(dataJSON[imgsList[currentImgIndex]].framing || 1);
  const [interferenceGrade, setInterferenceGrade] = useState<number>(dataJSON[imgsList[currentImgIndex]].interference || 1);
  const [generalGrade, setGeneralGrade] = useState<number>(dataJSON[imgsList[currentImgIndex]].general_quality || 1);

  function nextImage() {

    setDataJSON(prev => ({
      ...prev,
      [imgsList[currentImgIndex]]: {
        blur: blurGrade,
        brightness: brightnessGrade,
        distance: distanceGrade,
        framing: framingGrade,
        interference: interferenceGrade,
        general_quality: generalGrade,
        audited: true
      }
    }));

    if (currentImgIndex < imgsList.length - 1) {

      setBlurGrade(dataJSON[imgsList[currentImgIndex + 1]].blur || 1);
      setBrightnessGrade(dataJSON[imgsList[currentImgIndex + 1]].brightness || 1);
      setDistanceGrade(dataJSON[imgsList[currentImgIndex + 1]].distance || 1);
      setFramingGrade(dataJSON[imgsList[currentImgIndex + 1]].framing || 1);
      setInterferenceGrade(dataJSON[imgsList[currentImgIndex + 1]].interference || 1);
      setGeneralGrade(dataJSON[imgsList[currentImgIndex + 1]].general_quality || 1);

      setCurrentImgIndex(currentImgIndex + 1);
    }
    else {
      alert("You have reached the end of the images.");
    }
  }

  function previousImage() {

    if (currentImgIndex > 0) {

      setBlurGrade(dataJSON[imgsList[currentImgIndex - 1]].blur || 1);
      setBrightnessGrade(dataJSON[imgsList[currentImgIndex - 1]].brightness || 1);
      setDistanceGrade(dataJSON[imgsList[currentImgIndex - 1]].distance || 1);
      setFramingGrade(dataJSON[imgsList[currentImgIndex - 1]].framing || 1);
      setInterferenceGrade(dataJSON[imgsList[currentImgIndex - 1]].interference || 1);
      setGeneralGrade(dataJSON[imgsList[currentImgIndex - 1]].general_quality || 1);

      setCurrentImgIndex(currentImgIndex - 1);
    }

    else {
      alert("You are at the first image.");
    }
  }

  async function saveData() {

    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataJSON)
    });

    if (res.ok) {
      alert("Annotations saved successfully!");
    } else {
      alert("Error saving file");
    }
  }


  return (
    <div className="h-screen w-screen flex flex-col items-center gap-10">

      <Header />

      <div className="flex w-full mt-9">

        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="text-2xl font-bold mb-2">{currentImgIndex + 1} / {imgsList.length}</span>
          <Image src={`/images/${imgsList[currentImgIndex]}`} alt="teste" height={500} width={500}/>
          <span className="text-xl mt-2">{imgsList[currentImgIndex]}</span>
        </div>

        <div className="flex-1 flex justify-center items-center w-full">
          
          <form action="" className="w-[80%] flex flex-wrap gap-24 justify-center">

            <InputGrade label="Blur" value={blurGrade} onChange={(newValue) => setBlurGrade(newValue)}/>
            <InputGrade label="Brightness" value={brightnessGrade} onChange={(newValue) => setBrightnessGrade(newValue)}/>
            <InputGrade label="Distance" value={distanceGrade} onChange={(newValue) => setDistanceGrade(newValue)}/>
            <InputGrade label="Framing" value={framingGrade} onChange={(newValue) => setFramingGrade(newValue)}/>
            <InputGrade label="Interference" value={interferenceGrade} onChange={(newValue) => setInterferenceGrade(newValue)}/>
            <InputGrade label="General Perception" value={generalGrade} onChange={(newValue) => setGeneralGrade(newValue)}/>
          </form>
        </div>
        
      </div>

      <div className="flex gap-2 items-center justify-center">

        <button className="hover:scale-105 cursor-pointer" onClick={previousImage}>{arrowLeft}</button>
        <button className="hover:scale-105 cursor-pointer rounded-md bg-blue-500 h-12 px-4 text-white font-bold" onClick={saveData}>SAVE</button>
        <button className="hover:scale-105 cursor-pointer" onClick={nextImage}>{arrowRight}</button>

      </div>
      
    </div>
  );
}
