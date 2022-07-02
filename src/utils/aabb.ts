import Konva from "konva";

export type AABB = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// returns true if the rectangles are touching at all
export function aabbOverlap(a: AABB, b: AABB) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

// returns true if b is completely inside a
export function aabbContains(a: AABB, b: AABB) {
  return (
    a.x <= b.x && a.x + a.width >= b.x + b.width && a.y <= b.y && a.y + a.height >= b.y + b.height
  );
}

export const aabbFromNode = (node: Konva.Node) => ({
  x: node.x(),
  y: node.y(),
  width: node.width(),
  height: node.height(),
});

export const getViewportAABB = (stage: Konva.Stage) => ({
  x: -stage.x() * (1 / stage.scaleX()),
  y: -stage.y() * (1 / stage.scaleY()),
  width: stage.width() * (1 / stage.scaleX()),
  height: stage.height() * (1 / stage.scaleY()),
});

export const getScreenSizeAsAABB = (stage: Konva.Stage) => ({
  x: 0,
  y: 0,
  width: stage.width(),
  height: stage.height(),
});

export function isNodeVisibleInStage(stage: Konva.Stage, node: Konva.Node) {
  return aabbOverlap(node.getClientRect(), getScreenSizeAsAABB(stage));
}

export function lockAABBInAABB(bounds: AABB, node: AABB): AABB {
  const canFit = node.width <= bounds.width && node.height <= bounds.height;

  if (canFit) {
    const n = { ...node };

    if (n.x < bounds.x) {
      n.x = bounds.x;
    } else if (n.x + n.width > bounds.x + bounds.width) {
      n.x = bounds.x + bounds.width - n.width;
    }

    if (n.y < bounds.y) {
      n.y = bounds.y;
    } else if (n.y + n.height > bounds.y + bounds.height) {
      n.y = bounds.y + bounds.height - n.height;
    }

    return n;
  } else {
    const center = {
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
    };

    if (center.x < bounds.x) {
      center.x = bounds.x;
    } else if (center.x > bounds.x + bounds.width) {
      center.x = bounds.x + bounds.width;
    }

    if (center.y < bounds.y) {
      center.y = bounds.y;
    } else if (center.y > bounds.y + bounds.height) {
      center.y = bounds.y + bounds.height;
    }

    const newPos = {
      x: center.x - node.width / 2,
      y: center.y - node.height / 2,
    };

    return {
      x: newPos.x,
      y: newPos.y,
      width: node.width,
      height: node.height,
    };
  }
}
