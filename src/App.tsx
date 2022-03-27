import React, { useEffect, useState } from "react";
import InputSearch from "./components/InputSearch/InputSearch";
import useGeoCode from "./hooks/useGeoCode";
import Weather from "./components/Weather/Weather";
import styled, { createGlobalStyle } from "styled-components";
import useNavigatorLocation from "./hooks/useNavigatorLocation";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 50px;
    margin: 0;
    font-family: "Inter", sans-serif;
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
  }
`;

const H1 = styled.h1`
  font-size: 66px;
  text-align: center;
`;

export type Position = {
  latitude: number | null;
  longitude: number | null;
};

function App() {
  const [position, setPosition] = useState<Position | null>(null);
  const { getNavigatorPermission } = useNavigatorLocation();

  const { fetch: fetchGeoCode, isLoading } = useGeoCode({
    onSuccess: (data) => {
      if (data && data.result.addressMatches.length > 0) {
        setPosition({
          latitude: data?.result.addressMatches[0].coordinates.y,
          longitude: data?.result.addressMatches[0].coordinates.x,
        });
        return;
      }
      setPosition({
        latitude: null,
        longitude: null,
      });
    },
  });

  useEffect(() => {
    getNavigatorPermission({
      onSuccess: (position) => {
        setPosition(position);
      },
    });
  }, []);

  return (
    <div>
      <GlobalStyle />
      <H1>Weather Forecast</H1>
      <InputSearch fetchGeoCode={fetchGeoCode} />
      {position && <Weather position={position} loadingGeoCode={isLoading} />}
    </div>
  );
}

export default App;
