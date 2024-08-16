import React, { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import parseCSV from './utils/parseCSV';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useEffect(() => {
    async function loadData() {
      const data = await parseCSV('/csvGen.csv');
      console.log(data);
      const newNodes = [];
      const newEdges = [];

      data.forEach((item, index) => {
        newNodes.push({
          id: item.lgLabel,
          position: { x: 0, y: index * 100 },
          data: { label: item.lgLabel }
        });

        item.conPostReqs.forEach(conPostReq => {
          newEdges.push({
            id: `${item.lgLabel}-${conPostReq}`,
            source: item.lgLabel,
            target: conPostReq
          });
        });
        });

        setNodes(newNodes);
        setEdges(newEdges);
        setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
