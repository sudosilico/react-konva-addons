import { useState } from "react";

export function useForceRerender() {
  const [, set] = useState(0);
  return () => set((n) => n + 1);
}
