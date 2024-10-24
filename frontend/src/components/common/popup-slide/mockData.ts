// todo 페칭 구현 완료 후 삭제
const mockData = [
  {
    id: 1,
    ownerId: 1,
    title: "Mock-1",
    description: "Title: description",
    location: "경기도 과천시",
    isParkingAvailable: true,
    fee: 19000,
    startDate: "2024-08-02T19:32:19.379718",
    endDate: "2024-08-02T19:32:19.379718",
    openTimes: "평일 09:00 ~ 18:00,\n주말 12:00 ~ 21:00\n",
    latitude: 37.556725,
    longitude: 126.9234952,
    publicTag: "예술",
  },
  {
    id: 2,
    ownerId: 2,
    title: "Mock-2",
    description: "Title: description",
    location: "서울특별시",
    isParkingAvailable: false,
    fee: 25000,
    startDate: "2024-09-01T14:00:00.000000",
    endDate: "2024-09-05T18:00:00.000000",
    openTimes: "평일 10:00 ~ 19:00,\n주말 11:00 ~ 17:00\n",
    latitude: 37.566536,
    longitude: 126.977966,
    publicTag: "음악",
  },
  {
    id: 3,
    ownerId: 3,
    title: "Mock-3",
    description: "Title: description",
    location: "부산광역시",
    isParkingAvailable: true,
    fee: 30000,
    startDate: "2024-10-10T09:00:00.000000",
    endDate: "2024-10-12T18:00:00.000000",
    openTimes: "평일 09:00 ~ 18:00,\n주말 12:00 ~ 21:00\n",
    latitude: 35.179554,
    longitude: 129.075642,
    publicTag: "공연",
  },
  {
    id: 4,
    ownerId: 4,
    title: "Mock-4",
    description: "Title: description",
    location: "대구광역시",
    isParkingAvailable: false,
    fee: 22000,
    startDate: "2024-11-01T12:00:00.000000",
    endDate: "2024-11-03T18:00:00.000000",
    openTimes: "평일 09:00 ~ 18:00,\n주말 13:00 ~ 19:00\n",
    latitude: 35.871435,
    longitude: 128.601445,
    publicTag: "전시",
  },
  {
    id: 5,
    ownerId: 5,
    title: "Mock-5",
    description: "Title: description",
    location: "광주광역시",
    isParkingAvailable: true,
    fee: 27000,
    startDate: "2024-12-05T10:00:00.000000",
    endDate: "2024-12-10T18:00:00.000000",
    openTimes: "평일 08:00 ~ 17:00,\n주말 09:00 ~ 19:00\n",
    latitude: 35.159545,
    longitude: 126.852601,
    publicTag: "영화",
  },
  {
    id: 6,
    ownerId: 6,
    title: "Mock-6",
    description: "Title: description",
    location: "대전광역시",
    isParkingAvailable: true,
    fee: 35000,
    startDate: "2025-01-10T09:00:00.000000",
    endDate: "2025-01-12T18:00:00.000000",
    openTimes: "평일 10:00 ~ 19:00,\n주말 12:00 ~ 20:00\n",
    latitude: 36.350411,
    longitude: 127.384547,
    publicTag: "연극",
  },
];

export default mockData;
