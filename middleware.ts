import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // req.cookies.get("")
  console.log(req);
}
