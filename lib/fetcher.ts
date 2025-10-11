import axios from "axios";

/**
 * Fetches data from a given URL using axios
 *
 * @param url - The URL to fetch data from
 * @returns A promise that resolves to the response data
 * @throws {AxiosError} When the request fails
 */
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher