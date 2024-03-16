<script lang="ts">
  import { requestNotificationPermission } from "$lib/utilities";
  import { onMount } from "svelte";
  let notificationPermission: NotificationPermission;
  onMount(async () => {
    notificationPermission = Notification.permission;
  });
</script>

<button on:click={() => requestNotificationPermission()}>Request Notification Permission</button>

<p>Notification permission: {notificationPermission ? notificationPermission : ""}</p>
