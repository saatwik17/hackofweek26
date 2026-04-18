import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3';
import { useContainerDimensions } from '../hooks/useContainerDimensions';
import { convertToD3, DirectoryNode, D3TreeNode, cn } from '../lib/utils';
import { Folder, FolderClosed, PlusCircle } from 'lucide-react';

interface TreeCanvasProps {
  tree: DirectoryNode | null;
  activeNodeId: string | null;
  selectedNodeId: string | null;
  onSelectNode: (node: DirectoryNode) => void;
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({
  tree,
  activeNodeId,
  selectedNodeId,
  onSelectNode,
}) => {
  const { containerRef, dimensions } = useContainerDimensions();

  const { nodes, links } = useMemo(() => {
    if (!tree || dimensions.width === 0) return { nodes: [], links: [] };

    const d3TreeData = convertToD3(tree);
    if (!d3TreeData) return { nodes: [], links: [] };

    const root = d3.hierarchy(d3TreeData);
    // Determine tree dimensions based on the container width to keep it somewhat centered
    const treeLayout = d3.tree<D3TreeNode>().nodeSize([140, 100]);
    treeLayout(root);

    return {
      nodes: root.descendants(),
      links: root.links(),
    };
  }, [tree, dimensions]);

  // Transform coordinates to be centered horizontally and below top edge
  const getX = (x: number) => x + dimensions.width / 2;
  const getY = (y: number) => y + 80;

  return (
    <div 
      className="w-full h-full bg-[#0a0f18] rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing border border-slate-800"
      ref={containerRef}
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* We use a drag wrapper with motion for easy panning */}
      <motion.div 
        drag 
        dragConstraints={containerRef}
        className="w-full h-full absolute inset-0 mix-blend-screen"
        initial={{ x: 0, y: 0 }}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <AnimatePresence>
            {links.map((link) => {
              if (link.target.data.isDummy) return null;
              
              // We want smooth bezier curves
              const pathGenerator = d3.linkVertical<any, any>()
                .x(d => getX(d.x))
                .y(d => getY(d.y));
                
              const d = pathGenerator({ source: link.source, target: link.target }) || '';

              return (
                <motion.path
                  key={`${link.source.data.id}-${link.target.data.id}`}
                  d={d}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={2}
                />
              );
            })}
          </AnimatePresence>
        </svg>

        {nodes.map((node) => {
          if (node.data.isDummy) return null;
          
          const isSelected = selectedNodeId === node.data.id;
          const isActive = activeNodeId === node.data.id;
          
          return (
            <motion.div
              key={node.data.id}
              className="absolute top-0 left-0"
              initial={{ opacity: 0, scale: 0.5, x: getX(node.x), y: getY(node.y) }}
              animate={{ opacity: 1, scale: 1, x: getX(node.x), y: getY(node.y) }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
              style={{ x: '-50%', y: '-50%' }}
            >
              <button
                onClick={() => node.data.actualNode && onSelectNode(node.data.actualNode)}
                className={cn(
                  "flex flex-col items-center gap-2 group transition-all duration-300",
                  "focus:outline-none"
                )}
              >
                <motion.div 
                  className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-xl",
                    "border-2 transition-colors",
                    isActive 
                      ? "bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.5)]" 
                      : isSelected
                        ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                        : "bg-slate-800/80 border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200"
                  )}
                  animate={isActive ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Folder className="w-6 h-6 fill-current opacity-20" />
                </motion.div>
                
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-mono tracking-wider font-semibold",
                  "bg-slate-900 border",
                  isActive
                    ? "border-fuchsia-500/50 text-fuchsia-300"
                    : isSelected
                      ? "border-sky-500/50 text-sky-300"
                      : "border-slate-800 text-slate-400"
                )}>
                  {node.data.name}
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
