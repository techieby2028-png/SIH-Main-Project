import { db } from "../db/offlineDB";

export async function syncOfflineData() {
  const queue = await db.syncQueue.toArray();

  if (queue.length === 0) {
    console.log("No offline data to sync.");
    return;
  }

  for (const item of queue) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item.data),
        }
      );

      if (response.ok) {
        await db.syncQueue.delete(item.id);
        console.log("Appointment synced successfully.");
      }
    } catch (error) {
      console.log("Sync failed. Will try again later.");
    }
  }
}