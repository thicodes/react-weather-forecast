import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputSearch from "../InputSearch";

describe("InputSearch", () => {
  it("fetch when fill input", () => {
    const spyFetchGeoCode = jest.fn();
    render(<InputSearch fetchGeoCode={spyFetchGeoCode} />);
    const inputSearch = screen.getByPlaceholderText("Search US Address");
    userEvent.type(inputSearch, "Address test");

    expect(spyFetchGeoCode).not.toBeCalled();
    userEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(spyFetchGeoCode).toBeCalledTimes(1);
  });

  it("don't call fetch when input blank", () => {
    const spyFetchGeoCode = jest.fn();
    render(<InputSearch fetchGeoCode={spyFetchGeoCode} />);
    const inputSearch = screen.getByPlaceholderText("Search US Address");
    userEvent.type(inputSearch, " ");

    expect(spyFetchGeoCode).not.toBeCalled();
    userEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(spyFetchGeoCode).not.toBeCalled();
  });
});
