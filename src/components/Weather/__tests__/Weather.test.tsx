import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockAxios } from "../../../tests/testHelpers";
import Weather from "../Weather";
import { mockForecast } from "./fixtures";

describe("InputSearch", () => {
  it("render location not found", async () => {
    const position = {
      latitude: null,
      longitude: null,
    };
    render(<Weather position={position} loadingGeoCode={false} />);
    expect(
      screen.getByText("Sorry, we couldn't find your location =(")
    ).toBeInTheDocument();
  });

  it("render weather and firsts 7 firecasts properly", async () => {
    const position = {
      latitude: 123123,
      longitude: 43343,
    };
    mockAxios.get.mockImplementation(async (url) => {
      if (url === "https://api.weather.gov/points/123123,43343") {
        return {
          data: {
            properties: {
              forecast:
                "https://api.weather.gov/gridpoints/LWX/100,69/forecast",
            },
          },
        };
      }
      if (url === "https://api.weather.gov/gridpoints/LWX/100,69/forecast") {
        return {
          data: mockForecast,
        };
      }
    });
    render(<Weather position={position} loadingGeoCode={false} />);
    await act(() => Promise.resolve());

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.queryByText("80")).not.toBeInTheDocument();
    expect(screen.queryByText("90")).not.toBeInTheDocument();
  });
});
