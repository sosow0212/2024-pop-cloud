const getToken = async (OAuthPermittedCode: string, platform: "kakao") => {
  try {
    const url = `/auth/login/oauth/${platform}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        OAuthPermittedCode,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getToken;
