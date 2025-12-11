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
  console.log("[SW] Push received:", event);

  const data = event.data ? event.data.json() : { title: "No payload", body: "" };

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/logo.svg", // your icon
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // opens your site on click
  );
});
