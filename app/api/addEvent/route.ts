import { NextRequest, NextResponse } from "next/server";
import { start } from "repl";

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get("Authorization");
  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token provided" },
      { status: 401 }
    );
  }

  const values = await req.json();
  console.log(values);

  // TODO: allow for event creation via Google Calendar API
}
