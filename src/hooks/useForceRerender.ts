import { useCallback, useState } from "react";

export function useForceRerender() {
  const [, set] = useState(0);
  return useCallback(() => set((n) => n + 1), []);
}
