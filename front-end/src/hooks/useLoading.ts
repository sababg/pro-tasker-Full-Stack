import { useCallback, useState } from "react";

export const useLoading = (initialValue = false) => {
  const [loading, setLoading] = useState(initialValue);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);
  const toggleLoading = useCallback(() => setLoading((prev) => !prev), []);

  return {
    loading,
    setLoading,
    startLoading,
    stopLoading,
    toggleLoading,
  };
};
