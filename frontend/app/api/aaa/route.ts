import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      aa: "aa",
    });
  } catch (error) {
    throw new NextResponse("error", { status: 500 });
  }
}
