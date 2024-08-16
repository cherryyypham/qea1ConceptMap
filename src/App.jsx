import React, { useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialNodes, initialEdges } from './utils/nodes-edges.js';
import useLayoutElements from './utils/useLayoutElements';
import { Modal } from 'antd';
import StudentOutcomeResults from './components/StudentOutcomeResults';

// Custom node color
const getNodeColor = (label) => {
  if (label.includes('LA')) return '#80CED7';
  if (label.includes('PR')) return '#8E6C88';
  return '#FFFFFF';
};

const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
      ...node,
      style: { backgroundColor: getNodeColor(node.data.label) }
    }))
  );
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Apply initial layout using the hook
  const [initialized] = useLayoutElements();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleNodeClick = (event, node) => {
    setModalContent(`Node clicked: ${node.id}`);
    setIsModalOpen(true);
  };

  const courseId = '790';
  const studentId = '99499058';

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
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
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <StudentOutcomeResults courseId={courseId} studentId={studentId} />
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
