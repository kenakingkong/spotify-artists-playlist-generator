import { AxiosRequestConfig, AxiosResponse } from "axios";

type MockAxios = {
  get: jest.Mock<Promise<AxiosResponse<any>>, [string, AxiosRequestConfig?]>;
  post: jest.Mock<
    Promise<AxiosResponse<any>>,
    [string, any?, AxiosRequestConfig?]
  >;
  create: jest.Mock<MockAxios, []>;
};

const mockAxios: MockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => mockAxios),
};

export default mockAxios;
