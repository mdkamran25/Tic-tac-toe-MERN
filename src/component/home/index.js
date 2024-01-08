import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import {
  createRoomApi,
  joinRoomApi,
  previousDataApi,
} from "../../api/game.api";
import PreviousDataTable from "../table/previousDataTable";
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5001')

const Home = () => {
  const [user, setUser] = useState(null);
  const [previousGameData, setPreviousGameData] = useState()
  const [toggleInputField, setToggleInputField] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response.status) {
          setUser(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const fetchUserPreviousData = async () => {
        const res = await previousDataApi(user?._id);
        if(!res.status){
          console.log(res.message)
          return;
        }
        setPreviousGameData(res.data)
      };
      fetchUserPreviousData();
    }
  }, [user]);

  const generateCustomRoomCode = async () => {
    const customRoomCode = Math.random().toString().substring(2, 8);
    const data = {
      roomCode: customRoomCode,
      playerXId: user?._id,
      board: ["", "", "", "", "", "", "", "", ""],
      winner: "",
      status: false,
      leftGame: { playerX: false, playerO: false },
    };
    try {
      const response = await createRoomApi(data);
      if (response?.status) {
        navigate(`/custom_room/${customRoomCode}`);
      } else {
        console.log(response?.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const joinRoom = () => {
    setToggleInputField(!toggleInputField);
  };

  const handleSubmit = async () => {
    if (joinRoomCode.length !== 6) {
      alert("First Enter a Valid Room Code");
      return;
    }
    const data = {
      roomCode: joinRoomCode,
      playerO: user?._id,
      status: true,
    };
    try {
      const response = await joinRoomApi(data);
      if (response?.status) {
        navigate(`/custom_room/${joinRoomCode}`);
      } else {
        setErrorMessage(response?.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 mb-4">Welcome, {user?.name}</h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary me-2"
          onClick={generateCustomRoomCode}
        >
          Create Room
        </button>
        <button className="btn btn-warning" onClick={joinRoom}>
          Join Room
        </button>
      </div>
      {toggleInputField && (
        <>
          <div className="mt-3 d-flex justify-content-center">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter Room Code"
              value={joinRoomCode}
              onChange={(e) => setJoinRoomCode(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Join
            </button>
            <br />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </>
      )}

      <div className="col-11 mt-5">
        <PreviousDataTable user={user} previousGameData={previousGameData} />
      </div>
    </div>
  );
};

export default React.memo(Home);
