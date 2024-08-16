import React, { useState, useEffect } from 'react';
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
import '@xyflow/react/dist/style.css';
import { initialNodes, initialEdges } from './utils/nodes-edges.js';
import { collide } from './utils/collide.js';
import { forceSimulation, forceLink, forceManyBody, forceX, forceY } from 'd3-force';
import { Modal } from 'antd';

const useLayoutElements = () => {
  const { getNodes, getEdges, setNodes, fitView } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();
  const initialized = nodes.length > 0;

  useEffect(() => {
    if (!initialized) return;

    // Initiate force simulation
    const simulation = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(-1000))
      .force('x', forceX().strength(0.05))
      .force('y', forceY().strength(0.05))
      .force('collide', collide())
      .force('link', forceLink(edges).id((d) => d.id).strength(0.05).distance(100))
      .alphaTarget(0.05)
      .on('tick', () => {
        setNodes((prevNodes) => 
          prevNodes.map((node, i) => ({
            ...node,
            position: { x: nodes[i].x, y: nodes[i].y },
          }))
        );
        fitView();
      });

    const tick = () => {
      window.requestAnimationFrame(tick);
    };
    tick();

    return () => {
      simulation.stop();
    };
  }, [initialized, nodes, edges, setNodes, fitView]);

  return [initialized];
};

const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [initialized] = useLayoutElements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleNodeClick = (event, node) => {
    setModalContent(`Node clicked: ${node.id}`);
    setIsModalOpen(true);
  };

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick} // Add this line
        >
          <Panel>
            {initialized}
          </Panel>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      <Modal
        title="Node Information"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}