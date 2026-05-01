import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';

export function useAudio() {
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    return () => {
      howlRef.current?.unload();
      howlRef.current = null;
    };
  }, []);

  const play = useCallback((src: string) => {
    if (!src) return false;
    howlRef.current?.unload();
    const h = new Howl({ src: [src], html5: true, volume: 1.0 });
    howlRef.current = h;
    h.play();
    return true;
  }, []);

  const stop = useCallback(() => {
    howlRef.current?.stop();
  }, []);

  return { play, stop };
}
