"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./components/header";
import { arrowRight, arrowLeft } from "./icons";
import InputGrade from "./components/inputGrade";
import Footer from "./components/footer";

export default function Home() {

  const [dataJSON, setDataJSON] = useState<Record<string, any>>({});
  const [imgsList, setImgsList] = useState<string[]>([]);

  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  
  const [blurGrade, setBlurGrade] = useState<number>(1);
  const [brightnessGrade, setBrightnessGrade] = useState<number>(1);
  const [distanceGrade, setDistanceGrade] = useState<number>(1);
  const [framingGrade, setFramingGrade] = useState<number>(1);
  const [interferenceGrade, setInterferenceGrade] = useState<number>(1);
  const [generalGrade, setGeneralGrade] = useState<number>(1);
  const [discarded, setDiscarded] = useState<boolean>(false);

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
        discarded: discarded,
        audited: true
      }
    }));

    console.log(dataJSON);

    if (currentImgIndex < imgsList.length - 1) {

      setBlurGrade(dataJSON[imgsList[currentImgIndex + 1]].blur || 1);
      setBrightnessGrade(dataJSON[imgsList[currentImgIndex + 1]].brightness || 1);
      setDistanceGrade(dataJSON[imgsList[currentImgIndex + 1]].distance || 1);
      setFramingGrade(dataJSON[imgsList[currentImgIndex + 1]].framing || 1);
      setInterferenceGrade(dataJSON[imgsList[currentImgIndex + 1]].interference || 1);
      setGeneralGrade(dataJSON[imgsList[currentImgIndex + 1]].general_quality || 1);
      setDiscarded(dataJSON[imgsList[currentImgIndex + 1]].discarded || false);

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
      setDiscarded(dataJSON[imgsList[currentImgIndex - 1]].discarded || false);
      setDiscarded(dataJSON[imgsList[currentImgIndex - 1]].discarded || false);

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

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
  
        setDataJSON(data);
  
        const imgs = Object.keys(data);
        setImgsList(imgs);
  
        const firstUnauditedIndex = imgs.findIndex(
          key => !data[key].audited
        );
  
        const index = firstUnauditedIndex !== -1 ? firstUnauditedIndex : 0;
  
        setCurrentImgIndex(index);
  
        const imgData = data[imgs[index]] ?? {};
  
        setBlurGrade(imgData.blur ?? 1);
        setBrightnessGrade(imgData.brightness ?? 1);
        setDistanceGrade(imgData.distance ?? 1);
        setFramingGrade(imgData.framing ?? 1);
        setInterferenceGrade(imgData.interference ?? 1);
        setGeneralGrade(imgData.general_quality ?? 1);
        setDiscarded(imgData.discarded ?? false);
  
      });
  }, []);


  return (
    <div className="w-full flex flex-col items-center gap-10">

      <Header />

      <div className="flex-col gap-8 lg:flex-row lg:gap-0 flex w-full mt-9">

        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="text-2xl font-bold mb-2">{currentImgIndex + 1} / {imgsList.length}</span>
          <Image src={`/images/${imgsList[currentImgIndex]}`} alt="teste" height={500} width={500}/>
          <span className="text-xl mt-2">{imgsList[currentImgIndex]}</span>
        </div>

        <div className="flex-1 flex flex-col items-center w-full">

          <h1 className="text-4xl font-bold">Avaliação</h1>
          <p className="mt-3 mb-8 w-[70%]">Avaliação das imagens de acordo com os critérios definidos no handbook de instruções para anotação de imagens de lesões de pele.</p>
          
          <form action="" className="w-[80%] flex flex-col gap-4 justify-center">

            <InputGrade label="Blur" value={blurGrade} onChange={(newValue) => setBlurGrade(newValue)}/>
            <InputGrade label="Brightness" value={brightnessGrade} onChange={(newValue) => setBrightnessGrade(newValue)}/>
            <InputGrade label="Distance" value={distanceGrade} onChange={(newValue) => setDistanceGrade(newValue)}/>
            <InputGrade label="Framing" value={framingGrade} onChange={(newValue) => setFramingGrade(newValue)}/>
            <InputGrade label="Interference" value={interferenceGrade} onChange={(newValue) => setInterferenceGrade(newValue)}/>
            <InputGrade label="General Perception" value={generalGrade} onChange={(newValue) => setGeneralGrade(newValue)}/>
          </form>


          <div className="flex justify-center items-center text-2xl mt-4">
            <label className="mr-2">Você descartaria essa imagem? </label>
            <div
                className="flex text-black pl-3 pr-3 py-1 text-center ml-2"
            >
                <div className="flex flex-col mr-2">

                    <label>Sim</label>
                    <input type="radio" value="Sim" checked={discarded === true} onChange={() => setDiscarded(true)} />
                </div>

                <div className="flex flex-col mr-2">
                    <label>Não</label>
                    <input type="radio" value="Não" checked={discarded === false} onChange={() => setDiscarded(false)} />
                </div>  
            </div>
          </div>
        </div>
        
      </div>

      <div className="flex gap-2 items-center justify-center">

        <button className="hover:scale-105 cursor-pointer" onClick={previousImage}>{arrowLeft}</button>
        <button className="hover:scale-105 cursor-pointer rounded-md bg-blue-500 h-12 px-4 text-white font-bold" onClick={saveData}>SAVE</button>
        <button className="hover:scale-105 cursor-pointer" onClick={nextImage}>{arrowRight}</button>

      </div>

      <Footer />
      
    </div>
  );
}
