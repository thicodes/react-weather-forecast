import axios from "axios";
import { useEffect, useState } from "react";
import { Position } from "../../App";

const LIMIT_DAYS_TO_DISPLAY = 7;

type Weather = {
  name: string;
  temperature: number;
  number: number;
};

const getForecastUrl = async (position: Position) => {
  const response = await axios.get(
    `https://api.weather.gov/points/${position.latitude},${position.longitude}`
  );
  return response;
};

const getWeather = async (forecastURL: string) => {
  const response = await axios.get(forecastURL);
  return response;
};

const useWeather = (position: Position | null) => {
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (position && position.latitude) {
      (async () => {
        setLoading(true);
        let forecastData = null;
        try {
          forecastData = await getForecastUrl(position);
        } catch (error) {
          console.log("Error", error);
        }
        if (!forecastData) {
          setLoading(false);
          return null;
        }

        const weatherData = await getWeather(
          forecastData?.data?.properties?.forecast
        );
        setLoading(false);
        const weather = (weatherData?.data?.properties?.periods || [])
          .filter((period: { isDaytime: boolean }) => period.isDaytime)
          .filter(
            (_: any, index: number) => index + 1 <= LIMIT_DAYS_TO_DISPLAY
          );
        setWeatherData(weather);
      })();
      return;
    }
    setWeatherData([]);
  }, [position]);

  return {
    data: weatherData,
    isLoading,
  };
};

export default useWeather;
