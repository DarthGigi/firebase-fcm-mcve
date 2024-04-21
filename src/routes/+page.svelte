<script lang="ts">
  import { internalStorage } from "$lib/stores/preferences";
  import { requestNotificationPermission } from "$lib/utilities";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const permission = writable<NotificationPermission>();
  const handleRequestPermission = async (request: boolean = false) => {
    permission.set(await requestNotificationPermission(request));
    if ($permission === "denied" || $permission === "default") {
      internalStorage.update((state) => ({
        ...state,
        fcmToken: "Permission Denied"
      }));
    }
  };

  onMount(async () => {
    handleRequestPermission();
  });
</script>

<button on:click={() => handleRequestPermission(true)}>Request Notification Permission</button>

<p>Notification permission: {$permission}</p>

<p>Firebase Token:</p>
<p>{$internalStorage.fcmToken}</p>

<button on:click={() => window.location.reload()}>Reload Page</button>
