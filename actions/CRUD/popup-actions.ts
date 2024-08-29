type IPopupDetailInfo = {
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
  publicTag: IPublicTag;
};

type IPopupFormData = {
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

type IPopupListResponse = {
  id: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

const getPopupInfo = async (id: string): Promise<IPopupDetailInfo | Error> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/popup/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error("internall error");
  } catch (error) {
    return error as Error;
  }
};

const getPopupList = async (
  lastPopupId: string,
): Promise<IPopupListResponse[] | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/popup/${lastPopupId}`,
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

const postPopupInfo = async (popupData: IPopupFormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/popup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        params: popupData,
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

const patchPopup = async (id: string, data: FormData) => {
  try {
    // const {} = data
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/popup/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getPopupInfo, getPopupList, postPopupInfo, patchPopup };
