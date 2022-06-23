import { Layer, Rect, Stage } from "react-konva";
import { useRef, useState } from "react";
import { Spring, animated } from "@react-spring/konva";
import Konva from "konva";

type MyRectProps = {
  //
};

function ColoredRect() {
  const ref = useRef<Konva.Rect>(null);
  const [flag, setFlag] = useState(false);

  const [springProps, setSpringProps] = useState({
    x: Math.random() * 700,
    y: Math.random() * 400,
    rotation: Math.random() * 380,
  });

  const handleClick = () => {
    setFlag(!flag);

    setSpringProps({
      x: Math.random() * 700,
      y: Math.random() * 400,
      rotation: Math.random() * 380,
    });
  };

  console.log("rendering: ColoredRect");

  return (
    <Spring to={springProps} config={{ mass: 10, tension: 1000, friction: 100 }}>
      {(props) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */
        <animated.Rect
          ref={ref}
          {...props}
          onClick={handleClick}
          width={50}
          height={50}
          offset={[25, 25]}
          fill="#addb67"
          stroke="black"
          strokeWidth={1}
        />
      )}
    </Spring>
  );
}

export type SpringTestProps = {
  //
};

export function SpringTest() {
  const nums: number[] = [];

  for (let i = 0; i < 10; i++) {
    nums.push(i);
  }

  return (
    <Stage width={700} height={400}>
      <Layer>
        <Rect width={700} height={400} fill="#ff0ff0" />
        {nums.map((num) => (
          <ColoredRect key={num} />
        ))}
      </Layer>
    </Stage>
  );
}
