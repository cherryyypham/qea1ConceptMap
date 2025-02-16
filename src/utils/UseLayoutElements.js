import React, { useEffect, useRef } from 'react';
import { useReactFlow } from '@xyflow/react';

// Utility function to position nodes in a grid (only for initial layout)
const positionNodesInGrid = (nodes, cols = 5, rowHeight = 100, colWidth = 200) => {
  const sortedNodes = [...nodes].sort((a, b) => a.id.localeCompare(b.id));
  
  return sortedNodes.map((node, index) => ({
    ...node,
    position: {
      x: (index % cols) * colWidth,
      y: Math.floor(index / cols) * rowHeight
    }
  }));
};

const useLayoutElements = () => {
  const { getNodes, setNodes, fitView } = useReactFlow();
  const nodes = getNodes();
  const initialized = nodes.length > 0;
  const initialLayoutApplied = useRef(false); // Ref to track initial layout application

  useEffect(() => {
    if (!initialized) return;

    if (!initialLayoutApplied.current) {
      const gridNodes = positionNodesInGrid(nodes);
      setNodes(gridNodes);
      initialLayoutApplied.current = true; // Mark initial layout as applied
    }

    fitView();
  }, [initialized, nodes, setNodes, fitView]);

  return [initialized];
};

export default useLayoutElements;
