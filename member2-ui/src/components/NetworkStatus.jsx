import { useEffect, useState } from "react";
import { syncOfflineData } from "../services/syncService";

function NetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      syncOfflineData();
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {online ? (
        <p>🟢 Online — Data will sync normally</p>
      ) : (
        <p>🔴 Offline — Data will be saved locally</p>
      )}
    </div>
  );
}

export default NetworkStatus;