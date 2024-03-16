/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));
// importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");
import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebase =
  getApps().length === 0
    ? initializeApp({
        apiKey: "AIzaSyCnCKoxJ6ok4WglL_bPFi_Y5NenF1po59M",
        authDomain: "fir-fcm-mcve.firebaseapp.com",
        projectId: "fir-fcm-mcve",
        storageBucket: "fir-fcm-mcve.appspot.com",
        messagingSenderId: "312974715018",
        appId: "1:312974715018:web:13d2def22bb6c43e56a573",
        measurementId: "G-96Z7BN7ME5"
      })
    : getApp();

const messaging = getMessaging(firebase);
onBackgroundMessage(messaging, async (/** @type {import("firebase/messaging").MessagePayload} */ payload) => {
  console.log("onBackgroundMessage: ", payload);
  const notification = /** @type {import("firebase/messaging").NotificationPayload} */ (payload.notification);
  const notificationTitle = notification?.title ?? "New message from Firebase!";
  const notificationOptions = /** @type {NotificationOptions} */ ({
    body: notification?.body ?? "This is a Firebase Cloud Messaging background message!",
    icon: notification?.icon ?? "https://firebase-fcm-mcve.vercel.app/favicon.ico",
    image: notification?.image ?? "https://firebase-fcm-mcve.vercel.app/favicon.ico"
  });

  sw.registration.showNotification(notificationTitle, notificationOptions);
});

// A simple, no-op service worker that takes immediate control.
sw.addEventListener("install", () => {
  console.log("Service worker installed.");
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  sw.skipWaiting();
});

sw.addEventListener("activate", () => {
  console.log("Service worker activated.");
  // Optional: Get a list of all the current open windows/tabs under
  // our service worker's control, and force them to reload.
  // This can "unbreak" any open windows/tabs as soon as the new
  // service worker activates, rather than users having to manually reload.
  sw.clients.matchAll({ type: "window" }).then((windowClients) => {
    windowClients.forEach((windowClient) => {
      windowClient.navigate(windowClient.url);
    });
  });
});
