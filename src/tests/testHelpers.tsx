import { AxiosStatic } from "axios";

// eslint-disable-next-line global-require
export const mockAxios: jest.Mocked<AxiosStatic> = require("axios").default;
