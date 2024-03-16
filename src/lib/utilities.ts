export function requestNotificationPermission(request: boolean = false) {
  if (request) {
    return Notification.requestPermission().then(async (permission) => {
      return permission;
    });
  }

  return Notification.permission;
}
