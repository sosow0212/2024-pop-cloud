/* eslint-disable no-console */

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "mocks", "db.json");

// 타입 정의
interface PopupRequest {
  // 기본 정보
  title: string; // 팝업스토어 제목
  description: string; // 설명

  // 일정 관련
  startDate: string; // 시작 날짜 (ISO 8601 형식)
  endDate: string; // 종료 날짜 (ISO 8601 형식)
  openTimes: string; // 영업 시간

  // 위치 정보
  location: string; // 주소
  latitude: string; // 위도
  longitude: string; // 경도

  // 편의시설 정보
  isParkingAvailable?: boolean; // 주차 가능 여부
  isFoodAllowed?: boolean; // 음식물 반입 가능 여부
  isPetAllowed?: boolean; // 반려동물 동반 가능 여부
  isKidsZone?: boolean; // 키즈존 유무
  isWifiAvailable?: boolean; // 와이파이 사용 가능 여부

  // 요금 및 태그
  fee?: number; // 입장료
  publicTag: string; // 대표 태그
  tags?: string[]; // 태그 목록
}

const POST = async (request: NextRequest) => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      console.error("db.json 파일이 없습니다.");
      return NextResponse.json(
        {
          status: 500,
          message: "db.json 파일이 없습니다.",
        },
        { status: 500 },
      );
    }

    const dbContent = fs.readFileSync(DB_PATH, "utf-8");
    const db = JSON.parse(dbContent);

    const popupData: PopupRequest = await request.json();

    const newPopup = {
      id: db.popups.length + 1,
      ...popupData,
      createdAt: new Date().toISOString(),
    };

    // 파일 쓰기 확인 로그 추가
    console.log("New popup data to be added:", newPopup);

    db.popups.push(newPopup);

    // 파일 저장
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");

    console.log("API Route: Successfully saved new popup to db.json");

    return NextResponse.json(
      {
        status: 201,
        message: "팝업스토어가 성공적으로 등록되었습니다.",
        data: { id: newPopup.id },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "서버 에러가 발생했습니다.",
      },
      { status: 500 },
    );
  }
};

export default POST;
