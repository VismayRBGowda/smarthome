import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileImage from './assets/profile.webp';
import logoImg from './assets/logo.jpg';
import { toast } from 'react-toastify';

function Navbar({ showNotification }) {
  const location = useLocation();

  return (
    <nav className="bg-black flex h-[10vh] justify-between mb-3 font-montserrat items-center shadow-xl">
        <div className="title bg-black flex items-center">
            <img src={logoImg} alt="Profile" className="rounded-full h-12 w-12 mx-3 ml-5 mt-3 p-0.5 border-3 border-green-500" />
            <h1 className="text-red-400 font-lg text-3xl pl-3 mx-3 font-montserrat  pt-2">PowerPulse</h1>
        </div>
        <ul className="flex p-3 items-center justify-center mt-3 font-bold text-xs mr-5">
            <li
            className={` px-5 mx-3 ${
                location.pathname === '/' ? 'text-gray-200 bg-lime-600 rounded-full focus:outline-none p-1.5' : 'text-gray-400'
            }`}
            >
            <Link to="/">Home</Link>
            </li>
            <li
            className={`px-5 mx-3 ${
                location.pathname === '/kitchen' ? 'text-gray-200 bg-lime-600 rounded-full border-zinc-500 p-1.5' : 'text-gray-400'
            }`}
            >
            <Link to="/kitchen">Kitchen</Link>
            </li>
            <li
            className={`px-3 mx-3 ${
                location.pathname === '/living-room' ? 'text-gray-200 bg-lime-600 rounded-full border-zinc-500 p-1.5' : 'text-gray-400'
            }`}
            >
            <Link to="/living-room">Living Room</Link>
            </li>
            <li
            className={`px-3 mx-3 ${
                location.pathname === '/home-office' ? 'text-gray-200 bg-lime-600 rounded-full border-zinc-500 p-1.5' : 'text-gray-400'
            }`}
            >
            <Link to="/home-office">Home Office</Link>
            </li>
            <li
            className={`px-3 mx-3 ${
                location.pathname === '/history' ? 'text-gray-200 rounded-full bg-lime-600 border-zinc-500 p-1.5' : 'text-gray-400'
            }`}
            >
            <Link to="/history">History</Link>
            </li>
            <li
            className={`px-3 mx-3 ${
                location.pathname === '/other' ? 'text-gray-200 rounded-full bg-lime-600 border-zinc-500 p-1' : 'text-gray-400'
            }`}
            >
            <Link to="/other">Other</Link>
            </li>
        </ul>

        {/* <div className={`group profile flex p-3 items-center rounded-full hover:bg-rose-400 justify-center mt-3 font-bold hover:cursor-pointer text-2xl mr-5 ${showNotification ? 'text-red-500 bg-white' : ''}`}>
            <span className="material-symbols-outlined text-amber-500 hover:text-black group-hover:text-black">notifications_unread</span>
        </div> */}

        {/* <div onClick={()=>{if(showNotification){toast.error('Total energy consumption exceeded threshold!'); console.log("you can view notifications")}}} className={`group profile flex p-3 items-center rounded-full justify-center mt-3 font-bold text-2xl mr-5 ${showNotification ? 'text-red-500 bg-white' : 'hover:bg-rose-400 hover:cursor-pointer'}`}>
            <span className="material-symbols-outlined text-amber-500 hover:text-black group-hover:text-black">notifications_unread</span>
        </div> */}


        <div className="profile flex p-3 items-center justify-center mt-3 font-bold hover:cursor-pointer text-base mr-5">
            <img src={profileImage} alt="Profile" className="rounded-full h-12 w-12 p-1 border-3 mt-2 border-amber-500" />
        </div>
    </nav>
  );
}

export default Navbar;