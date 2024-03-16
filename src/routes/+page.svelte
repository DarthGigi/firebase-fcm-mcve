<script lang="ts">
  import { requestNotificationPermission } from "$lib/utilities";
  import { onMount } from "svelte";

  const handleNotificationPermission = async () => {
    await requestNotificationPermission(true);
    window.location.reload();
  };

  let notificationPermission: NotificationPermission;

  onMount(async () => {
    notificationPermission = await requestNotificationPermission();
  });
</script>

<button on:click={handleNotificationPermission}>Request Notification Permission</button>

<p>Notification permission: {notificationPermission}</p>
