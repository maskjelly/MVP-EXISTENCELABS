"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import { getWeather } from "../../utils/weather";
import FileViewer from "../../components/file-viewer";

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});

  const functionCallHandler = async (call) => {
    if (call?.function?.name !== "get_weather") return;
    const args = JSON.parse(call.function.arguments);
    const data = getWeather(args.location);
    setWeatherData(data);
    return JSON.stringify(data);
  };

  // return (
  //   <main className={styles.main}>
  //     <div className={styles.container}>
  //       <div className={styles.fileViewer}>
  //         <FileViewer />
  //       </div>
  //       <div className={styles.chatContainer}>
  //         <div className={styles.weatherWidget}>
  //           <div className={styles.weatherContainer}>
  //             <WeatherWidget {...weatherData} />
  //           </div>
  //         </div>
  //         <div className={styles.chat}>
  //           <Chat functionCallHandler={functionCallHandler} />
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
