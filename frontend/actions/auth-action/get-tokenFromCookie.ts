import { cookies } from "next/headers";

// only server side

const getTokenFromCookie = (): string | null => {
  try {
    const accessToken = cookies().get("accessToken");

    if (!accessToken) {
      console.error("Access token not found in cookies");
      return null;
    }
    return accessToken.value;
  } catch (error) {
    console.error("Error retrieving access token from cookie:", error);
    return null;
  }
};

export default getTokenFromCookie;
