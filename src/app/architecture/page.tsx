"use client";

import { useState, useCallback } from "react";
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from "framer-motion";
import { Server, Layout, Database, Brain, Lock, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Custom node styles based on the portfolio's shadcn theme
const nodeStyle = {
  background: 'hsl(var(--card))',
  color: 'hsl(var(--foreground))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  padding: '16px',
  fontSize: '12px',
  minWidth: '150px',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
};

const initialNodes: Node[] = [
  { id: '1', position: { x: 50, y: 50 }, data: { label: <div className="flex flex-col items-center gap-2"><Layout className="w-5 h-5 text-primary"/><span>Frontend (Next.js)</span></div> }, style: nodeStyle },
  { id: '2', position: { x: 300, y: 50 }, data: { label: <div className="flex flex-col items-center gap-2"><Lock className="w-5 h-5 text-primary"/><span>API Gateway & Auth</span></div> }, style: nodeStyle },
  { id: '3', position: { x: 550, y: -50 }, data: { label: <div className="flex flex-col items-center gap-2"><Server className="w-5 h-5 text-primary"/><span>Core Microservice</span></div> }, style: nodeStyle },
  { id: '4', position: { x: 550, y: 150 }, data: { label: <div className="flex flex-col items-center gap-2"><Brain className="w-5 h-5 text-primary"/><span>AI Inference (FastAPI)</span></div> }, style: nodeStyle },
  { id: '5', position: { x: 800, y: -50 }, data: { label: <div className="flex flex-col items-center gap-2"><Database className="w-5 h-5 text-primary"/><span>Primary DB (PostgreSQL)</span></div> }, style: nodeStyle },
  { id: '6', position: { x: 800, y: 150 }, data: { label: <div className="flex flex-col items-center gap-2"><Database className="w-5 h-5 text-primary"/><span>Vector DB / Cache (Redis)</span></div> }, style: nodeStyle },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e3-4', source: '3', target: '4', label: 'RPC Call', type: 'step' },
];

export default function ArchitectureGalleryPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string>("Click on a node in the playground to view its architectural responsibilities.");

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    // Map node IDs to descriptions
    const infoMap: Record<string, string> = {
      '1': 'Frontend: Next.js App Router deployed on Vercel Edge. Responsible for rendering the accessible UI, handling client state, and communicating with the API gateway.',
      '2': 'API Gateway & Auth: Handles rate limiting, JWT validation, and routes requests to appropriate microservices. Ensures strict security perimeters.',
      '3': 'Core Microservice: Go/Python service handling business logic, transaction management, and interfacing with the primary relational database.',
      '4': 'AI Inference: FastAPI service wrapping ML models (e.g., IndicTrans2 or GenAI). Optimized for low-latency inference using ONNX runtime and GPU acceleration.',
      '5': 'Primary DB: PostgreSQL database for ACID-compliant structured data storage (users, configurations, audit logs).',
      '6': 'Vector DB / Cache: Redis instance used for caching common translation pairs and storing embeddings for fast RAG retrieval.'
    };
    setSelectedNodeInfo(infoMap[node.id] || "No detailed information available for this component.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-24 flex flex-col">
      <div className="max-w-6xl mx-auto w-full space-y-8 flex-1 flex flex-col">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Network className="w-4 h-4" />
            System Design Gallery
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Interactive Architecture Playground</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the generic blueprint of my high-performance, AI-integrated microservices architecture. Pan, zoom, and click nodes to learn more.
          </p>
        </motion.div>

        {/* Info Panel */}
        <Card className="bg-muted/50 border-primary/20">
          <CardContent className="p-4 text-sm font-medium text-center">
            {selectedNodeInfo}
          </CardContent>
        </Card>

        {/* React Flow Container */}
        <div className="flex-1 w-full rounded-xl border overflow-hidden min-h-[500px] bg-card relative shadow-inner">
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            className="dark:bg-zinc-950"
            colorMode="dark"
          >
            <Background gap={12} size={1} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
