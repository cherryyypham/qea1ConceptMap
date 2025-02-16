import React, { useState } from 'react';
import {
  ReactFlow,
  Panel,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialNodes, initialEdges } from '../utils/nodes-edges.js';
import UseLayoutElements from '../utils/UseLayoutElements';
import NodeInfoModal from './NodeInfoModal';
import StudentOutcomeResults from './StudentOutcomeResults';


const getNodeColor = (label) => {
  if (label.includes('LA')) return '#80CED7';
  if (label.includes('PR')) return '#8E6C88';
  return '#FFFFFF';
};

const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
      ...node,
      style: { backgroundColor: getNodeColor(node.data.label) },
    }))
  );
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const [initialized] = UseLayoutElements();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleNodeClick = (event, node) => {
    setModalContent(
      <div>
        <StudentOutcomeResults courseId={courseId} studentId={studentId} />
        <p><strong>Pre-requisites:</strong> {node.data.preReqs.join(', ') || 'None'}</p>
        <p><strong>Post-requisites:</strong> {node.data.conPostReqs.join(', ') || 'None'}</p>
        <p><strong>Lessons:</strong> {node.data.lessons.join(', ') || 'None'}</p>
      </div>
    );
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

      <NodeInfoModal 
        isModalOpen={isModalOpen} 
        closeModal={() => setIsModalOpen(false)} 
        modalContent={modalContent} 
      />
    </>
  );
};

export default LayoutFlow;
