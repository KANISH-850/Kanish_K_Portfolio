"use client";

import { useState, useCallback, useMemo } from "react";
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { skillsNodes, skillsLinks } from "@/data/skills-matrix";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

export function InteractiveSkillsMatrix() {
  // Convert our data model into React Flow nodes and edges
  const initialNodes: Node[] = useMemo(() => skillsNodes.map((s, idx) => ({
    id: s.id,
    position: { 
      x: (idx % 4) * 200 + Math.random() * 50, 
      y: Math.floor(idx / 4) * 150 + Math.random() * 50 
    },
    data: { label: s.name, category: s.category, projects: s.projects, level: s.level },
    style: {
      background: 'hsl(var(--card))',
      color: 'hsl(var(--foreground))',
      border: `2px solid hsl(var(--primary) / ${s.level * 20}%)`,
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }
  })), []);

  const initialEdges: Edge[] = useMemo(() => skillsLinks.map((l, idx) => ({
    id: `e-${l.source}-${l.target}`,
    source: l.source,
    target: l.target,
    animated: true,
    style: { stroke: 'hsl(var(--primary) / 40%)' }
  })), []);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(skillsNodes.map(s => s.category)))];

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedSkill(node.data);
  };

  const handleFilter = (category: string) => {
    setActiveFilter(category);
    setNodes((nds) => nds.map((n) => {
      const isVisible = category === "All" || n.data.category === category;
      return {
        ...n,
        hidden: !isVisible,
      };
    }));
  };

  return (
    <div className="flex flex-col h-[700px] w-full gap-4">
      
      {/* Filters & Details Panel */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1 bg-muted/30 border-muted">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <Filter className="w-4 h-4" /> Filters
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    activeFilter === cat 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background hover:bg-muted border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            {selectedSkill ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{selectedSkill.label as string}</h3>
                  <Badge variant="outline">{selectedSkill.category as string}</Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  Proficiency: <div className="flex gap-1">{Array.from({length: 5}).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < (selectedSkill.level as number) ? 'bg-primary' : 'bg-muted'}`} />
                  ))}</div>
                </div>
                <div className="pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Applied In</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(selectedSkill.projects as string[]).map(p => (
                      <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center italic">
                Click on a skill node to view detailed metrics and project applications.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Graph Playground */}
      <div className="flex-1 w-full rounded-xl border overflow-hidden bg-card relative shadow-inner">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          className="dark:bg-zinc-950"
          colorMode="dark"
          minZoom={0.5}
          maxZoom={2}
        >
          <Background gap={16} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
