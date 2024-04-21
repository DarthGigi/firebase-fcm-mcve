<script lang="ts">
  import { dev } from "$app/environment";
  import { PUBLIC_VAPID_KEY } from "$env/static/public";
  import { firebaseConfig } from "$lib/firebase";
  import { internalStorage } from "$lib/stores/preferences";
  import { requestNotificationPermission } from "$lib/utilities";
  import type { FirebaseApp } from "firebase/app";
  import { initializeApp } from "firebase/app";
  import { getMessaging, getToken, onMessage } from "firebase/messaging";
  import { onMount } from "svelte";

  onMount(async () => {
    const serviceWorker = await navigator.serviceWorker.register("/service-worker.js", {
      type: dev ? "module" : "classic"
    });
    // Initialize Firebase
    const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

    const permission = await requestNotificationPermission();
    if (permission === "granted") {
      const messaging = getMessaging(firebaseApp);
      const token = await getToken(messaging, {
        vapidKey: PUBLIC_VAPID_KEY,
        serviceWorkerRegistration: serviceWorker
      });
      internalStorage.update((state) => ({
        ...state,
        fcmToken: token
      }));

      onMessage(messaging, (payload) => {
        console.log("onMessage: ", payload);
      });
    }
  });
</script>

<slot />
