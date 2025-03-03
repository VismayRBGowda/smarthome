import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Kitchen from "./Kitchen";
import LivingRoom from "./LivingRoom";
import HomeOffice from "./HomeOffice";
import Other from "./Other";
import Navbar from "./Navbar";
import TotalConsumptionChart from "./TotalConsumptionChart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import History from "./History"
import AudioPlayer from "./AudioPlayer";
import weathIm from './assets/cloudy.png';
import Notification from "./Notification";

const socket = socketIOClient("http://localhost:3001");

function App() {
  const location = useLocation();
  const [kitchenData, setKitchenData] = useState([]);
  const [livingRoomData, setLivingRoomData] = useState([]);
  const [homeOfficeData, setHomeOfficeData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [weather, setWeather] = useState(null);
  const [totalConsumptionData, setTotalConsumptionData] = useState([]);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const threshold = 7;

  const weatherImages = {
    sunny: '/assets/sunny.png',
    rainy: '/assets/rainy.png',
    windy: '/assets/windy.png',
    cloudy: '/assets/cloudy.png',
    snowy: '/assets/snowy.png',
    thundersotrm: '/assets/thuderstorm.png',
    foggy: '/assets/foggy.png',
  };

  useEffect(() => {
    let timeoutId;

    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
      setConnectionFailed(false);
      clearTimeout(timeoutId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    socket.on('energyUpdate', (data) => {
      console.log("Received room data : ", data.roomData);

      setKitchenData(prevData => [...prevData, data.roomData.kitchen]);
      setLivingRoomData(prevData => [...prevData, data.roomData.livingRoom]);
      setHomeOfficeData(prevData => [...prevData, data.roomData.homeOffice]);
      setOtherData(prevData => [...prevData, data.roomData.other]);
      setTotalConsumptionData(prevData => [...prevData, data.totalConsumption]);

      const total =
      (data.roomData.kitchen.dishwasher || 0) +
      (data.roomData.kitchen.fridge || 0) +
      (data.roomData.kitchen.microwave || 0) +
      (data.roomData.kitchen.kitchen12 || 0) +
      (data.roomData.kitchen.kitchen14 || 0) +
      (data.roomData.kitchen.kitchen38 || 0) +
      (data.roomData.livingRoom.livingRoom || 0) +
      (data.roomData.homeOffice.homeOffice || 0) +
      (data.roomData.other.furnace1 || 0) +
      (data.roomData.other.furnace2 || 0) +
      (data.roomData.other.wineCellar || 0) +
      (data.roomData.other.garageDoor || 0) +
      (data.roomData.other.barn || 0) +
      (data.roomData.other.well || 0);

      setTotalEnergy(prevTotal => prevTotal + total);
    });

    timeoutId = setTimeout(() => {
      if (!isConnected) {
        setConnectionFailed(true);
      }
    }, 7000);

    fetchWeather();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("energyUpdate");
      clearTimeout(timeoutId);
      console.log("Socket disconnected");
    };
  }, []);

  useEffect(() => {
    if (totalEnergy > threshold && !showNotification) {
      setShowNotification(true);
      toast.error(
        <div className="p-3">
          Total energy consumption exceeded threshold!
        </div>,
        {
          autoClose: false, 
          onClose: () => { // onClose should be a function
            // setShowNotification(false);
            // setTotalEnergy(0);
          },
        }
      );
    }
  }, [totalEnergy, showNotification]);

  const fetchWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "fa2a63aebc54213144b0cd570e7b1398"; // Replace with your actual API key
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );
          const data = await response.json();
          const temperatureCelsius = Math.round(data.main.temp - 273.15); // Convert to Celsius
  
          // Map OpenWeatherMap icon codes to your icon URLs
          const iconCode = data.weather[0].icon;
          // const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
          setWeather({
            temperature: temperatureCelsius,
            summary: data.weather[0].description,
            icon: iconUrl,
            message: `Today will be ${data.weather[0].description}.`,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div className="font-montserrat min-h-screen bg-black flex flex-col">
        <Navbar showNotification={showNotification} />
        <ToastContainer />
        <div className="main flex bg-black">
          <div className="left w-1/4 flex bg-black mb-2 flex-col">
            <div className="ltop bg-zinc-800 h-1/3 m-3 hover:bg-zinc-700/70 cursor-pointer rounded-lg shadow-xl">
            {weather ? (
                <div className="weather p-3 flex flex-col font-montserrat">
                  {/* <div className="title flex justify-center items-center text-lg text-amber-400 mb-2">
                    <span className="material-symbols-outlined mx-2 text-xl">music_note</span>
                    <h2 className="font-bold">Weather</h2>
                  </div>
                  <div className="line h-[2px] w-full bg-red-500 mb-3"></div> */}
                  <div className="up mx-2 h-3/4 flex items-center justify-around">
                    <div className="left w-3/5">
                      {/* <img src={weatherImages[weather.summary.toLowerCase()] || weather.icon} alt="Weather Icon" className="w-25 h-25 mt-2" /> */}
                      <img src={weathIm} alt="Weather Icon" className="w-25 h-22 mt-2" />
                    </div>
                    <div className="right flex w-2/5 flex-col justify-center">
                      <div className="text-4xl font-bold items-center text-blue-600">
                        {weather.temperature}°
                      </div>
                      <div className="text-white items-center">
                        {weather.summary}
                      </div>
                    </div>
                  </div>
                  <div className="down h-1/4 flex justify-center items-center text-yellow-400">
                    <div className="mt-2">
                      {weather.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-white m-5">Loading weather...</div>
              )}
            </div>
            <AudioPlayer/>
          </div>
          <div className="center mb-4 flex bg-zinc-800 w-3/4 flex-shrink-0 rounded-lg m-3 shadow-xl overflow-y-auto h-[83vh]">
            <div className="w-full flex flex-col items-center justify-start overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {location.pathname === '/' && isConnected ? (
                <div className="flex flex-col items-center justify-center m-10">
                  <div className="title flex items-center text-amber-500 text-2xl m-3"><span class="material-symbols-outlined mx-3">cooking</span>Total Energy Consumption</div>
                  <div className="graph bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2">
                    <div className="energy text-white mx-3">{totalEnergy.toFixed(2)} kW</div>
                    <TotalConsumptionChart data={totalConsumptionData} />
                  </div>
                </div>
              ) : location.pathname === '/kitchen' ? (
                <div className="w-full flex flex-col items-center justify-start overflow-y-auto">
                  <div className="title text-2xl flex items-center text-amber-500 text- m-3"><span class="material-symbols-outlined mx-3">cooking</span>Kitchen Energy Consumption</div>
                  <div className="graph bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2">
                    <Kitchen kitchenData={kitchenData} />
                  </div>
                </div>
              ) : location.pathname === '/living-room' ? (
                <div className="flex flex-col items-center justify-center m-10">
                  <div className="title flex items-center text-amber-500 text-2xl m-3"><span class="material-symbols-outlined mx-3">living</span>Living Room Consumption</div>
                  <div className="graph  bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2">
                    <LivingRoom livingRoomData={livingRoomData} />
                  </div>
                </div>
              ) : location.pathname === '/home-office' ? (
                <div className="flex flex-col items-center justify-center m-10">
                  <div className="title flex items-center text-amber-500 text-2xl m-3"><span class="material-symbols-outlined mx-3">apartment</span>Home Office Energy Consumption</div>
                  <div className="graph bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2">
                    <HomeOffice homeOfficeData={homeOfficeData} />
                  </div>
                </div>
              ) : location.pathname === '/other' ? (
                <div className="w-full flex flex-col items-center justify-start overflow-y-auto">
                  <div className="title flex items-center text-amber-500 text-2xl m-3"><span class="material-symbols-outlined mx-3">more</span>Other Energy Consumption</div>
                  <div className="graph bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2">
                    <Other otherData={otherData} />
                  </div>
                </div>
              ) : location.pathname === '/history' ? (
                <div className="w-full flex flex-col items-center justify-start overflow-y-auto">
                  <div className="title flex items-center text-amber-500 text-2xl m-3"><span class="material-symbols-outlined mx-3">timeline</span>History</div>
                  <History />
                </div>
              ) : connectionFailed ? (
                <div className="test flex flex-grow justify-center items-center">
                  <span class="material-symbols-outlined text-yellow-400 text-2xl">error</span>
                  <p className="text-white text-2xl p-3">Failed to connect to server</p>
                </div>
              ) : (
                <div className="test flex flex-grow justify-center items-center">
                  <p className="text-white text-2xl p-3">Connecting to server...</p>
                </div>
              )}
            </div>
          </div>

          {/* <div className="right mb-4 bg-gray-700 w-1/4 min-h-[80vh] rounded-lg m-3 shadow-xl">

          </div> */}
        </div>
      </div>
      {/* <Routes>
        <Route path="/kitchen" element={<Kitchen kitchenData={kitchenData} />} />
        <Route path="/living-room" element={<LivingRoom livingRoomData={livingRoomData} />} />
        <Route path="/home-office" element={<HomeOffice homeOfficeData={homeOfficeData} />} />
        <Route path="/other" element={<Other otherData={otherData} />} />
      </Routes> */}
    </>
  );
}

export default App;
