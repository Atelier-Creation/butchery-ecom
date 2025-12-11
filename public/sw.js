// INSTALL
self.addEventListener("install", (event) => {
  console.log("SW installing…");
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  console.log("SW activated");
});

// LISTEN FOR SKIP WAITING REQUEST FROM PAGE
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// PUSH
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {
    title: "Notification",
    body: "",
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo.svg",
      data,
    })
  );
});

// NOTIFICATION CLICK
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
