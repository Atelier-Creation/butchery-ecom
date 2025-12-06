import { useEffect } from "react";

const PUBLIC_VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function usePushNotifications() {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      initPush();
    }
  }, []);

  async function initPush() {
    try {
      const permission = await Notification.requestPermission();
      console.log("Notification permission:", permission);
      if (permission !== "granted") return;

      const reg = await navigator.serviceWorker.ready; // Use SW from VitePWA
      console.log("Service Worker ready:", reg);

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });

      await fetch(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      console.log("Push subscription successful!", subscription);
    } catch (err) {
      console.error("Push subscription failed", err);
    }
  }
}
