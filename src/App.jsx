import React, { useMemo, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from 'd3-force';
import '@xyflow/react/dist/style.css';
import { initialNodes, initialEdges } from './utils/nodes-edges.js';
import { collide } from './utils/collide.js';

// Initiate force simulation
const createSimulation = (nodes, edges) => {
  return forceSimulation(nodes)
    .force('charge', forceManyBody().strength(-500))
    .force('x', forceX().x(0).strength(0.05))
    .force('y', forceY().y(0).strength(0.05))
    .force('collide', collide())
    .force(
      'link',
      forceLink(edges)
        .id((d) => d.id)
        .strength(0.05)
        .distance(100)
    )
    .alphaTarget(0.05)
    .stop();
};

// Handle interactions with nodes and edges
const useLayoutedElements = () => {
  const { getNodes, getEdges, setNodes, fitView } = useReactFlow();
  const initialized = getNodes().length > 0;

  useEffect(() => {
    if (!initialized) return;

    const nodes = getNodes().map((node) => ({
      ...node,
      x: isFinite(node.position?.x) ? node.position.x : 0, // Default to 0 if NaN
      y: isFinite(node.position?.y) ? node.position.y : 0  // Default to 0 if NaN
    }));
    const edges = getEdges();

    const simulation = createSimulation(nodes, edges);

    const tick = () => {
      simulation.tick();
      setNodes(
        nodes.map((node) => ({
          ...node,
          position: {
            x: isFinite(node.x) ? node.x : 0, // Default to 0 if NaN
            y: isFinite(node.y) ? node.y : 0  // Default to 0 if NaN
          }
        }))
      );
      window.requestAnimationFrame(() => {
        fitView();
        tick();
      });
    };

    tick();

    return () => simulation.stop(); // Clean up on unmount
  }, [initialized, getNodes, getEdges, setNodes, fitView]);

  return [initialized];
};

// Render nodes and edges
const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [initialized] = useLayoutedElements();

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Panel>
          {initialized ? "Layout Initialized" : "Initializing Layout..."}
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
