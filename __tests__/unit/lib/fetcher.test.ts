import axios from "axios";
import fetcher from "@/lib/fetcher";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("unit/lib/fetcher tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data successfully from a URL", async () => {
    const mockData = { id: 1, name: "Test Data" };
    const mockResponse = { data: mockData };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const url = "https://api.example.com/data";
    const result = await fetcher(url);

    expect(mockedAxios.get).toHaveBeenCalledWith(url);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  it("should return the response data from axios", async () => {
    const mockData = { users: [{ id: 1 }, { id: 2 }] };
    const mockResponse = { data: mockData };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await fetcher("https://api.example.com/users");

    expect(result).toEqual(mockData);
  });

  it("should throw an error when the request fails", async () => {
    const mockError = new Error("Network Error");
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(fetcher("https://api.example.com/error")).rejects.toThrow(
      "Network Error"
    );
  });

  it("should handle 404 errors", async () => {
    const mockError = {
      response: {
        status: 404,
        data: { message: "Not Found" },
      },
    };
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(fetcher("https://api.example.com/notfound")).rejects.toEqual(
      mockError
    );
  });

  it("should handle 500 server errors", async () => {
    const mockError = {
      response: {
        status: 500,
        data: { message: "Internal Server Error" },
      },
    };
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(
      fetcher("https://api.example.com/servererror")
    ).rejects.toEqual(mockError);
  });

  it("should work with different URLs", async () => {
    const url1 = "https://api.example.com/endpoint1";
    const url2 = "https://api.example.com/endpoint2";
    const mockData1 = { result: "data1" };
    const mockData2 = { result: "data2" };

    mockedAxios.get
      .mockResolvedValueOnce({ data: mockData1 })
      .mockResolvedValueOnce({ data: mockData2 });

    const result1 = await fetcher(url1);
    const result2 = await fetcher(url2);

    expect(result1).toEqual(mockData1);
    expect(result2).toEqual(mockData2);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
