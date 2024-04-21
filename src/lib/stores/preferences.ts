import { persisted } from "svelte-persisted-store";
type InternalStorage = {
  fcmToken: string | undefined;
};
export const internalStorage = persisted<InternalStorage>("internalStorage", {
  fcmToken: undefined
});


