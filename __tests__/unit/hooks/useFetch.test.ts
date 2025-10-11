import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "@/hooks/useFetch";
import useSWR from "swr";

jest.mock("swr");
jest.mock("@/lib/fetcher");

const mockedUseSWR = useSWR as jest.MockedFunction<typeof useSWR>;

describe("unit/hooks/useFetch tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useSWR with the correct URL and fetcher", () => {
    const mockReturn = {
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const url = "https://api.example.com/data";
    renderHook(() => useFetch(url));

    expect(mockedUseSWR).toHaveBeenCalledWith(
      url,
      expect.any(Function),
      expect.objectContaining({
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      })
    );
  });

  it("should return data when the fetch is successful", () => {
    const mockData = { id: 1, name: "Test Data" };
    const mockReturn = {
      data: mockData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("should return error when the fetch fails", () => {
    const mockError = new Error("Failed to fetch");
    const mockReturn = {
      data: undefined,
      error: mockError,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/error")
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it("should show loading state initially", () => {
    const mockReturn = {
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/loading")
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it("should merge custom options with default options", () => {
    const mockReturn = {
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const customOpts = {
      refreshInterval: 5000,
      dedupingInterval: 2000,
    };

    renderHook(() => useFetch("https://api.example.com/data", customOpts));

    expect(mockedUseSWR).toHaveBeenCalledWith(
      "https://api.example.com/data",
      expect.any(Function),
      expect.objectContaining({
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        refreshInterval: 5000,
        dedupingInterval: 2000,
      })
    );
  });

  it("should allow custom options to override default options", () => {
    const mockReturn = {
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const customOpts = {
      revalidateOnFocus: true,
      shouldRetryOnError: true,
    };

    renderHook(() => useFetch("https://api.example.com/data", customOpts));

    expect(mockedUseSWR).toHaveBeenCalledWith(
      "https://api.example.com/data",
      expect.any(Function),
      expect.objectContaining({
        revalidateOnFocus: true,
        shouldRetryOnError: true,
      })
    );
  });

  it("should return mutate function from useSWR", () => {
    const mockMutate = jest.fn();
    const mockReturn = {
      data: { test: "data" },
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: mockMutate,
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    expect(result.current.mutate).toBe(mockMutate);
  });

  it("should handle empty options object", () => {
    const mockReturn = {
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    renderHook(() => useFetch("https://api.example.com/data", {}));

    expect(mockedUseSWR).toHaveBeenCalledWith(
      "https://api.example.com/data",
      expect.any(Function),
      expect.objectContaining({
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      })
    );
  });

  it("should work with different URLs", () => {
    const mockReturn = {
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    };
    mockedUseSWR.mockReturnValue(mockReturn as any);

    const { rerender } = renderHook(
      ({ url }) => useFetch(url),
      { initialProps: { url: "https://api.example.com/endpoint1" } }
    );

    expect(mockedUseSWR).toHaveBeenLastCalledWith(
      "https://api.example.com/endpoint1",
      expect.any(Function),
      expect.any(Object)
    );

    rerender({ url: "https://api.example.com/endpoint2" });

    expect(mockedUseSWR).toHaveBeenLastCalledWith(
      "https://api.example.com/endpoint2",
      expect.any(Function),
      expect.any(Object)
    );
  });
});
