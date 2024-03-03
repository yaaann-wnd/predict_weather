"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { dataset } from "@/data/dataset";

const DisplayResult = () => {
  const handleClick = () => {
    let success = 0;
    let error = 0;

    dataset.map((item) => {
      let result = runPrediction(
        item.precipitation,
        item.temp_max,
        item.temp_min,
        item.wind
      );

      if (result === item.weather) {
        success++;
      } else {
        error++;
        return `Hasil prediksi ${result}, seharusnya ${item.weather}`;
      }
    });

    console.log(`Success: ${success}`);
    console.log(`Error: ${error}`);
    console.log(`Accuracy: ${success/(success + error) * 100}%`);
  };

  const runPrediction = (precipitation, temp_max, temp_min, wind) => {
    if (precipitation <= 0.0) {
      if (temp_max >= 5.0 && temp_max <= 10.0) {
        if (temp_min <= 2.8 && temp_min >= -2.8) {
          if (wind <= 5.1 && wind >= 1.3) {
            return "sun";
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-3">
      <Button
        onClick={handleClick}
        className="px-7 dark:bg-pink-400 dark:hover:bg-pink-500 self-start"
      >
        Run
      </Button>
      <div className="border border-gray-700 rounded-md p-3 min-h-72">
        malas
      </div>
    </div>
  );
};

export default DisplayResult;
