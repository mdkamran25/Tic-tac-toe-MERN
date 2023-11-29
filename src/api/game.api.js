const baseURL = process.env.REACT_APP_SERVER_URL;

export const createRoomApi = async (data) => {
    const res = await fetch(`${baseURL}/createRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  
    return await res.json()
  };

export const joinRoomApi = async (data) => {
    const {roomCode, playerO, status} = data;
    const res = await fetch(`${baseURL}/joinRoom/${roomCode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({playerO, status})
      })
    
      return await res.json()   
}

export const fetchRoomApi = async (roomCode) => {

  const res = await fetch(`${baseURL}/fetchRoom/${roomCode}`, {
    method: 'GET',
    headers:{
      "Content-Type" : "application/json",
    }
  })
  return await res.json();
}

export const updateGameApi = async (data) => {
  const {roomCode} = data;
  const res = await fetch(`${baseURL}/updateGame/${roomCode}`, {
    method: 'PATCH',
    headers:{
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data)
  })
  return await res.json(); 
}

export const previousDataApi = async (id) => {
  const res = await fetch(`${baseURL}/previousGameData/${id}`, {
    method: 'GET',
    headers:{
      "Content-Type" : "application/json",
    }
  })
  return await res.json();
}