import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function useFetch(url?: string, _opts = {}) {
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ..._opts,
  });
}
