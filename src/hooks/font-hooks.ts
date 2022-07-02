import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { load as loadWebFont } from "webfontloader";
import Konva from "konva";

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;

export function useWebFont(fontFamily: string, fontWeights: FontWeight[]): void {
  useEffect(() => {
    loadWebFont({
      google: {
        families: [`${fontFamily}:${fontWeights.join(",")}`, "sans-serif"],
      },
    });
  }, [fontFamily, fontWeights]);
}

export function useFontsEventListener<K extends keyof FontFaceSetEventMap>(
  type: K,
  listener: (ev: FontFaceSetEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  const savedHandler = useRef(listener);

  useLayoutEffect(() => {
    savedHandler.current = listener;
  }, [listener]);

  useEffect(() => {
    const eventListener: typeof listener = (evt) => savedHandler.current(evt);

    document.fonts.addEventListener(type, eventListener, options);

    return () => {
      document.fonts.removeEventListener(type, eventListener);
    };
  }, [options, type]);
}

/**
 * Redraws the stage when the font loadingdone event is fired.
 */
export function useStageRedrawOnFontLoad(stageRef: RefObject<Konva.Stage>): void {
  const sRef = useRef({ loaded: false });

  useFontsEventListener("loadingdone", (evt) => {
    const stage = stageRef.current;
    const s = sRef.current;
    if (!stage || s.loaded) return;

    console.log("fonts loading done");
    console.log(evt);

    stage.draw();
    s.loaded = true;
  });
}
