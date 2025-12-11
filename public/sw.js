
// PUSH
self.addEventListener("push", (event) => {
  console.log("[SW] Push received:", event);

  const data = event.data ? event.data.json() : { title: "New Message", body: "Check out what's new." };
console.log("from notification sw:",data)
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo.svg", // your icon
      data: {
        notificationId: data.notificationId // Good practice to include custom data
      }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // opens your site on click
  );
});

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

