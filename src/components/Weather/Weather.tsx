import axios from "axios";
import { useEffect, useState } from "react";
import { Position } from "../../App";
import Card from "../ui/Card/Card";
import Loading from "../ui/Loading/Loading";
import useWeather from "./useWeather";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Temperature = styled.div`
  display: inline-block;
  font-size: 74px;
  vertical-align: top;
  line-height: 0.8;
`;

const Unit = styled.div`
  display: inline-block;
  font-size: 25px;
`;

const WeekName = styled.div`
  padding-bottom: 20px;
`;

const NotFound = styled.div`
  text-align: center;
  font-size: 44px;
  color: #b2b2b2;
`;

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
`;

export type WeatherProps = {
  position: Position | null;
  loadingGeoCode: boolean;
};

const Weather = (props: WeatherProps) => {
  const { position, loadingGeoCode } = props;
  const { data: weathers, isLoading } = useWeather(position);

  if (isLoading || loadingGeoCode) {
    return (
      <ContainerLoading>
        <Loading />
      </ContainerLoading>
    );
  }

  if (weathers.length === 0) {
    return <NotFound>Sorry, we couldn't find your location =(</NotFound>;
  }

  return (
    <Container>
      {weathers.map((weather) => {
        return (
          <Card key={weather.number}>
            <WeekName>{weather.name}</WeekName>
            <div>
              <Temperature>{weather.temperature}</Temperature>
              <Unit>°F</Unit>
            </div>
          </Card>
        );
      })}
    </Container>
  );
};

export default Weather;
