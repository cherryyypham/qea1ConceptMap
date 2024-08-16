export function collide(radius = 10) {
  let nodes;

  function force() {
    let i, n = nodes.length;
    let node;

    for (i = 0; i < n; ++i) {
      node = nodes[i];

      // Default node width and height
      const nodeWidth = node.width || 50;
      const nodeHeight = node.height || 50;

      for (let j = i + 1; j < n; ++j) {
        const otherNode = nodes[j];
        const otherWidth = otherNode.width || 50;
        const otherHeight = otherNode.height || 50;

        // Collision detection code
        let x = node.x - otherNode.x;
        let y = node.y - otherNode.y;
        let distance = Math.sqrt(x * x + y * y);
        let minDistance = (nodeWidth + otherWidth) / 2 + radius;

        if (distance < minDistance) {
          distance = (distance - minDistance) / distance * 0.5;
          x *= distance;
          y *= distance;
          node.x -= x;
          node.y -= y;
          otherNode.x += x;
          otherNode.y += y;
        }
      }
    }
  }

  force.initialize = function (_) {
    nodes = _;
  };

  return force;
}
