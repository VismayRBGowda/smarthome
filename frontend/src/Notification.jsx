import React from "react";

const Notification = ({ notifications, show }) => {
  return (
    <div
      className={`absolute top-16 right-10 w-96 bg-gray-900 text-white rounded-lg shadow-lg p-4 
      ${show ? "block" : "hidden"}`}
    >
      <h2 className="text-lg font-bold mb-3">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <div key={index} className="flex items-center border-b border-gray-700 p-2">
            <img src={notif.image} alt="icon" className="w-12 h-12 rounded-full mr-3" />
            <div>
              <p className="text-sm font-semibold">{notif.text}</p>
              <p className="text-xs text-gray-400">{notif.time} ago</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No new notifications</p>
      )}
    </div>
  );
};

export default Notification;
