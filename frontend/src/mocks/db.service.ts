/*eslint-disable*/

import fs from "fs";
import path from "path";

interface DbStructure {
  popups: any[];
  // 추후 다른 데이터 타입들도 추가 가능
}

const DB_PATH = path.join(process.cwd(), "src", "mocks", "db.json");

// db.json 초기화 또는 읽기
const initializeDb = (): DbStructure => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData: DbStructure = {
        popups: [],
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error initializing db.json:", error);
    throw error;
  }
};

// db.json 저장
const saveDb = (data: DbStructure): void => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving to db.json:", error);
    throw error;
  }
};

export const dbService = {
  savePopup: (popupData: any): number => {
    const db = initializeDb();
    const newId = db.popups.length + 1;

    const newPopup = {
      ...popupData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    db.popups.push(newPopup);
    saveDb(db);

    return newId;
  },
  // 추후 다른 데이터 타입에 대한 메서드들도 추가 가능
};
