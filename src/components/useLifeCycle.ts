import { useEffect, useRef, EffectCallback } from "react";

export function useDidMount(fn: EffectCallback) {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return mounted.current;
}

export function useDidUpdate(fn: EffectCallback, deps?: any[]) {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return mounted.current;
}

export function useWillUnmount(fn: EffectCallback) {
  useEffect(() => {
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
