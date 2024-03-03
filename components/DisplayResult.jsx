"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { dataset } from "@/data/dataset";
import { ReloadIcon } from "@radix-ui/react-icons";

const DisplayResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(0);
  const [error, setError] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setShowResult(false);
    setSuccess(0);
    setError(0);
    setAccuracy(0);

    await new Promise(resolve => setTimeout(resolve, 2500))

    dataset.map((item) => {
      let result = runPrediction(
        item.precipitation,
        item.temp_max,
        item.temp_min,
        item.wind
      );

      if (result === item.weather) {
        setSuccess((prev) => prev + 1);
      } else {
        setError((prev) => prev + 1);
      }
    });

    setShowResult(true);
    setIsLoading(false);
  };

  useEffect(() => {
    setAccuracy((success / (success + error)) * 100);
  });

  const handleResetClick = () => {
    setShowResult(false);
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
      return "drizzle";
    } else {
      if (temp_max <= 20.3 && temp_min >= 0.6) {
        return "rain";
      } else if (temp_max <= 7.2) {
        if (temp_max >= -1.1 && temp_min <= 0.6) {
          return "snow";
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="flex gap-x-3">
        <Button
          onClick={handleClick}
          className={`px-7 self-start ${isLoading ? '' : 'dark:bg-pink-400 dark:hover:bg-pink-500'}`}
          disabled={isLoading ? true : false}
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Tunggu" : "Run"}
        </Button>
        <Button
          onClick={handleResetClick}
          className="px-7 dark:bg-pink-400 dark:hover:bg-pink-500 self-start"
        >
          Reset
        </Button>
      </div>
      <div className="border border-gray-700 rounded-md p-3 min-h-72">
        {showResult && (
          <>
            <p>
              Success:{" "}
              <span className="font-semibold text-green-400">
                {success} predicted correctly
              </span>
            </p>
            <p>
              Error:{" "}
              <span className="font-semibold text-red-500">{error} wrong</span>
            </p>
            <p>
              Accuracy: <span className="font-semibold">{accuracy}%</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayResult;
