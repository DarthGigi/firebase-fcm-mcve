<script lang="ts">
  import { requestNotificationPermission } from "$lib/utilities";

  const handleNotificationPermission = async () => {
    await requestNotificationPermission(true);
    window.location.reload();
  };
</script>

<button on:click={handleNotificationPermission}>Request Notification Permission</button>

<p>Notification permission: {requestNotificationPermission()}</p>
