type IExhibitionDetailInfo = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  location: string;
  isParkingAvailable: boolean;
  fee: number;
  startDate: Date;
  endDate: Date;
  openTimes: string;
  latitude: number;
  longitude: number;
  publicTag: string;
};

type IExhibitionFormData = {
  title: string;
  description: string;
  location: string; //주소
  isParkingAvailable: boolean;
  fee: number;
  startDate: Date;
  endDate: Date;
  openTimes: string;
  latitude: number;
  longitude: number;
  publicTag: string;
  tags: string[];
};

type IExhibitionListResponse = {
  id: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

const getExhibitionInfo = async (
  id: string,
): Promise<IExhibitionDetailInfo | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/exhibition/${id}`,
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error("internall error");
  } catch (error) {
    return error as Error;
  }
};

const getExhibitionList = async (
  lastExhibitionId: string,
): Promise<IExhibitionListResponse[] | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/exhibition/${lastExhibitionId}`,
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error("internall error");
  } catch (error) {
    return error as Error;
  }
};

const postExhibitionInfo = async (ExhibitionData: IExhibitionFormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/exhibition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        params: ExhibitionData,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.id;
    }
  } catch (error) {
    console.log(error);
  }
};

const patchExhibition = async (id: string, data: FormData) => {
  try {
    // const {} = data
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/exhibition/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getExhibitionInfo,
  getExhibitionList,
  postExhibitionInfo,
  patchExhibition,
};
