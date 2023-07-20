import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;

export default function NotificationProvider({children}) {

  const [notification, setNotification] = useState("");
  const [classes, SetClasses] = useState("");

  /**
   * change the color and text according to user's keyboard input 
   * @param {*} type is the color shows on the div
   * @param {*} value is the text shows on the div 
   */
  const updateNotification = (type, value) => {
    if(timeoutId) clearTimeout(timeoutId)

    switch (type) {
      case "error":
        SetClasses("bg-red-500");
        break;
      case "success":
        SetClasses("bg-green-500");
        break;
      case "warning":
        SetClasses("bg-orange-500");
        break;
      default:
        SetClasses("bg-red-500");
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24 ">
          <div className="bounce shadow-md shadow-gray-400 rounded">
            <p className={classes + " text-white px-4 py-2 font-semibold"}>
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
