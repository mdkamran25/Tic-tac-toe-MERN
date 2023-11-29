const baseURL = process.env.REACT_APP_SERVER_URL;

export const userSignupApi = async (data) => {
    const res = await fetch(`${baseURL}/user`, {
      method: "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(data)
    })

    return await res.json()
  };
 
export const userLoginApi = async (data) => {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(data)
  })

  return await res.json();

}

export const getUserProfile = async () => {
    const token = localStorage.getItem('accessToken');
    if(!token){
      return null;
    }
    const res = await fetch(`${baseURL}/user/profile`, {
        method: 'GET',
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
          },
    });

    return await res.json();
}