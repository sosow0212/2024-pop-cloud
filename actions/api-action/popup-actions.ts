import qs from "query-string";

const getPopupInfo = async (id: string) => {
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

export { getPopupInfo, postPopupInfo, patchPopup };
