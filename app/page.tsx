"use client"

import data from "../public/data.json"
import { useState } from "react";
import Image from "next/image";
import Header from "./components/header";
import { arrowRight, arrowLeft } from "./icons";
import InputGrade from "./components/inputGrade";

export default function Home() {

  const [imgsList] = useState<string[]>(() => Object.keys(data));
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [blurGrade, setBlurGrade] = useState<number>(1);
  const [brightnessGrade, setBrightnessGrade] = useState<number>(1);
  const [distanceGrade, setDistanceGrade] = useState<number>(1);
  const [framingGrade, setFramingGrade] = useState<number>(1);
  const [interferenceGrade, setInterferenceGrade] = useState<number>(1);
  const [generalGrade, setGeneralGrade] = useState<number>(1);

  function nextImage() {

    if (currentImgIndex < imgsList.length - 1) {
      console.log(blurGrade)
      setCurrentImgIndex(currentImgIndex + 1);
      setBlurGrade(1);
      setBrightnessGrade(1);
      setDistanceGrade(1);
      setFramingGrade(1);
      setInterferenceGrade(1);
      setGeneralGrade(1);
    }
  }

  function previousImage() {

    if (currentImgIndex > 0) {
      setCurrentImgIndex(currentImgIndex - 1);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-10">

      <Header />

      <div className="flex w-full mt-9">

        <div className="flex-1 flex justify-center items-center">
          <Image src={`/${imgsList[currentImgIndex]}`} alt="teste" height={500} width={500}/>
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

      <div className="flex gap-2">

        <button className="hover:scale-105 cursor-pointer" onClick={previousImage}>{arrowLeft}</button>
        <button className="hover:scale-105 cursor-pointer" onClick={nextImage}>{arrowRight}</button>

      </div>
      
    </div>
  );
}
