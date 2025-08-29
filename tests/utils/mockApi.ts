import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Creates mocked Next.js API request/response objects
 * with common jest.fn() methods pre-wired.
 */
export function createMockApi() {
  const redirectMock: jest.Mock = jest.fn();
  const setHeaderMock: jest.Mock = jest.fn();
  const statusMock: jest.Mock = jest.fn().mockReturnThis();
  const jsonMock: jest.Mock = jest.fn().mockReturnThis();
  const sendMock: jest.Mock = jest.fn();

  const req: Partial<NextApiRequest> = {};
  const res: Partial<NextApiResponse> = {
    redirect: redirectMock,
    setHeader: setHeaderMock,
    status: statusMock,
    json: jsonMock,
    send: sendMock,
  };

  return {
    req,
    res,
    redirectMock,
    setHeaderMock,
    statusMock,
    jsonMock,
    sendMock,
  };
}
