import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // console.log("request:", request);
  console.log("request.query:", request.nextUrl.searchParams.get("title"));

  return Response.json({
    ok: true,
    review: request.nextUrl.searchParams.get("title"),
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  return Response.json(data);
}
