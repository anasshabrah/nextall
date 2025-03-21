// File: C:\Users\hanos\nextall\frontend\src\hooks\useIsMountedRef.js
import { useRef, useEffect } from 'react';

export default function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
}
