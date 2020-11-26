import { useContext } from "react";
import { StoreContext } from "./StoreProvider";

export function useUserStore() {
  const rootStore = useContext(StoreContext);
  if (!rootStore) {
    throw new Error("rootStore not found");
  }
  return rootStore.userStore;
}

export function useMarkersStore() {
  const rootStore = useContext(StoreContext);
  if (!rootStore) {
    throw new Error("rootStore not found");
  }
  return rootStore.markersStore;
}
export function useCommentsStore() {
  const rootStore = useContext(StoreContext);
  if (!rootStore) {
    throw new Error("rootStore not found");
  }
  return rootStore.commentsStore;
}
