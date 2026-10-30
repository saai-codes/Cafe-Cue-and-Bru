export function handleReservationRequest(
  reqBody: any,
  clientIp?: string
): Promise<{
  statusCode: number;
  body: any;
}>;

