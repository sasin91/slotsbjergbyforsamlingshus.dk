import { useEffect, useRef } from "react";

export type matchCallback = (event: KeyboardEvent) => boolean;
export type actionCallback = (event: KeyboardEvent) => void;

export default function useKey(match: matchCallback, onMatch: actionCallback) {
  const callback = useRef(onMatch);

  useEffect(() => {
    callback.current = onMatch;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (match(event)) {
        // event.stopPropagation();
        callback.current(event);
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [match]);
}
