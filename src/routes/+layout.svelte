<script lang="ts">
  import { dev } from "$app/environment";
  import { PUBLIC_VAPID_KEY } from "$env/static/public";
  import { firebaseConfig } from "$lib/firebase";
  import { requestNotificationPermission } from "$lib/utilities";
  import type { FirebaseApp } from "firebase/app";
  import { initializeApp } from "firebase/app";
  import { getMessaging, getToken, onMessage } from "firebase/messaging";
  import { onMount } from "svelte";

  // Initialize Firebase
  const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

  let token: string;
  onMount(async () => {
    const serviceWorker = navigator.serviceWorker.register("/service-worker.js", {
      type: dev ? "module" : "classic"
    });
    const permission = await requestNotificationPermission();
    if (permission === "granted") {
      const messaging = getMessaging(firebaseApp);
      getToken(messaging, {
        vapidKey: PUBLIC_VAPID_KEY,
        serviceWorkerRegistration: await serviceWorker
      });
      onMessage(messaging, (payload) => {
        console.log("onMessage: ", payload);
      });
    }
  });
</script>

<slot />
