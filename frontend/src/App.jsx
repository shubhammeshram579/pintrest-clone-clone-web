import React ,{useState} from "react";
import { Header, Footer } from "./componetes/index.js";
import { Outlet } from "react-router-dom";
import "./App.css";

// new post notification
import Notification from "./componetes/NotificationPost/NotificationPage.jsx";
import { NotificationProvider } from "./componetes/NotificationPost/NotificationContext.jsx";

function App() {
  const [showNotifications, setShowNotifications] = useState(false);


  return (
    <NotificationProvider>
      <div className=" w-full h-full">
        <div className="flex justify-normal flex-col">
          <Header
            setShowNotifications={setShowNotifications}
            showNotifications={showNotifications}
          />

          {/* </NotificationProvider> */}
          <div className="absolute z-[100] left-[76vw] mt-28">
            {showNotifications && (
              <Notification
                setShowNotifications={setShowNotifications}
                showNotifications={showNotifications}
              />
            )}
          </div>

          <main className="flex items-centre justify-center">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;

