// Install
self.addEventListener("install", (event) => {
  console.log("SW installing…");
  self.skipWaiting(); // <-- IMPORTANT
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("SW activated");
  event.waitUntil(self.clients.claim()); // <-- IMPORTANT
});

// PUSH
self.addEventListener("push", (event) => {
  console.log("[SW] Push received:", event);

  const data = event.data ? event.data.json() : {
    title: "Notification",
    body: "",
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo.svg",
      data, // keep data
    })
  );
});

// CLICK
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow("/") // open app
  );
});
