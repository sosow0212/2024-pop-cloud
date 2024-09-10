import { NextRequest, NextResponse } from "next/server";

// admin page 진입시 cookies로 토큰 검증하는 것으로 막아줘야함

export function middleware(req: NextRequest) {
  // req.cookies.get("")
  // console.log(req);
}
