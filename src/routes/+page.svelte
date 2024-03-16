<script lang="ts">
  import { requestNotificationPermission } from "$lib/utilities";
  import { onMount } from "svelte";
  import { getMessaging, getToken } from "firebase/messaging";

  onMount(async () => {
    handleRequestPermission();
  });

  let permission: NotificationPermission;
  let fcmToken: string;
  const handleRequestPermission = async (request: boolean = false) => {
    permission = await requestNotificationPermission(request);
    if (permission === "granted") {
      const messaging = getMessaging();
      fcmToken = await getToken(messaging, {
        serviceWorkerRegistration: await navigator.serviceWorker.ready
      });
    } else if (permission === "denied" || permission === "default") {
      console.log("Permission denied or default");
      fcmToken = "Permission denied or default";
    }
  };
</script>

<button on:click={() => handleRequestPermission(true)}>Request Notification Permission</button>

<p>Notification permission: {permission}</p>

<p>Firebase Token:</p>
<p>{fcmToken}</p>

<button on:click={() => window.location.reload()}>Reload Page</button>
