import "@testing-library/jest-dom";

require("jest-fetch-mock").enableMocks();

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});
