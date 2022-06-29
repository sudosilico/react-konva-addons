import Konva from "konva";
import { IFrame } from "konva/lib/types";
import { useCallback, useRef } from "react";
import { Group, Line, Rect, Text } from "react-konva";
import { useKonvaAnimation } from "../animation/useKonvaAnimation";
import { remapClamped } from "../utils/math";

type FrameCounterPointsProps = {
  width: number;
  height: number;
};

type FrameCounterRefState = {
  times: number[];
  points: number[];
  maxValue: number;
  fps: number;
  fpsAccumulator: number;
  frames: number;
  fpsTextY: number;
};

const fpsToMs = (fps: number) => 1000 / fps;
const msToFps = (ms: number) => 1000 / ms;

const frameTime144 = fpsToMs(144);
const frameTime60 = fpsToMs(60);
const frameTime30 = fpsToMs(30);

function FrameCounterPoints(props: FrameCounterPointsProps) {
  // refs
  const lineRef = useRef<Konva.Line>(null);
  const textRef30 = useRef<Konva.Text>(null);
  const textRef60 = useRef<Konva.Text>(null);
  const textRef144 = useRef<Konva.Text>(null);
  const textRefFps = useRef<Konva.Text>(null);
  const frameCounterRef = useRef<FrameCounterRefState>({
    times: [],
    points: [],
    maxValue: 0,
    fpsAccumulator: 0,
    fps: 0,
    frames: 0,
    fpsTextY: 0,
  });

  const timeToY = useCallback(
    (t: number) => remapClamped(msToFps(Math.max(t, 0.001)), 0, 200, props.height, 0),
    [props.height],
  );

  // logic
  const animate = useCallback(
    (frame: IFrame) => {
      const state = frameCounterRef.current;
      const line = lineRef.current;
      const text30 = textRef30.current;
      const text60 = textRef60.current;
      const text144 = textRef144.current;
      const fpsText = textRefFps.current;

      if (!state || !line || !text30 || !text60 || !text144 || !fpsText) return;

      const deltaTime = Math.min(frame.timeDiff, fpsToMs(1));

      if (frame.timeDiff > state.maxValue) {
        state.maxValue = deltaTime;
      }

      // make sure state.times has enough elements
      while (state.times.length < props.width - 50) {
        state.times.push(0);
      }

      for (let i = 1; i < state.times.length; i++) {
        state.times[i - 1] = state.times[i];
      }

      state.times[state.times.length - 1] = deltaTime;

      // recycle points array
      state.points.length = 0;

      for (let i = 0; i < state.times.length; i++) {
        state.points.push(i);
        state.points.push(timeToY(state.times[i]));
      }

      line.points(state.points);

      // fps text label
      state.frames++;
      const frequency = 500;

      state.fpsAccumulator += deltaTime;
      if (state.fpsAccumulator > frequency) {
        state.fpsAccumulator -= frequency;
        state.fps = state.frames;
        state.frames = 0;

        const frameCountToFPS = state.fps * (1000 / frequency);

        fpsText.text(`- ${frameCountToFPS} fps`);
        fpsText.y(timeToY(deltaTime) - 5);
      }

      text30.y(-5);
      text60.y(timeToY(frameTime60) - 5);
      text144.y(timeToY(frameTime144) - 5);
    },
    [props.width, timeToY],
  );

  useKonvaAnimation(animate);

  return (
    <>
      <Line ref={lineRef} stroke="black" strokeWidth={1} />
      <Rect width={50} height={props.height} fill="white" opacity={0.7} />
      <Rect width={2} height={props.height} x={50} fill="black" opacity={0.5} />
      <Text ref={textRef30} y={timeToY(frameTime30)} text="30 fps -" x={10} />
      <Text ref={textRef60} y={timeToY(frameTime60)} text="60 fps -" x={10} />
      <Text ref={textRef144} y={timeToY(frameTime144)} text="144 fps -" x={3} />
      <Rect x={props.width - 50} width={50} height={props.height} fill="white" opacity={1.0} />
      <Rect width={2} height={props.height} x={props.width - 52} fill="black" opacity={0.5} />
      <Text ref={textRefFps} text="0 fps" x={props.width - (50 - 3)} y={2} />
    </>
  );
}

export type FrameCounterProps = {
  x?: number;
  y?: number;
  opacity?: number;
  width: number;
  height: number;
};

const defaultFrameCounterProps = {};

export function FrameCounter(props: FrameCounterProps) {
  const { x, y, width, height } = { ...defaultFrameCounterProps, ...props };

  return (
    <Group
      x={x}
      y={y}
      opacity={0.5}
      listening={false}
      clipHeight={height}
      clipWidth={width}
      clipX={0}
      clipY={0}
    >
      <Rect width={width} height={height} fill="white" />
      <FrameCounterPoints width={width} height={height} />
    </Group>
  );
}
