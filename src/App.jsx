import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import LayoutFlow from './components/LayoutFlow';

export default function App() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
