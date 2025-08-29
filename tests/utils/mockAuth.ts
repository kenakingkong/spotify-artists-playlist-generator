export const MOCK_ACCESS_TOKEN = "MOCK_ACCESS_TOKEN";
export const MOCK_REFRESH_TOKEN = "MOCK_REFRESH_TOKEN";

export function mockWithSpotifyAuth(handler: any) {
  return async (req: any, res: any) => {
    return handler(req, res, MOCK_ACCESS_TOKEN);
  };
}
