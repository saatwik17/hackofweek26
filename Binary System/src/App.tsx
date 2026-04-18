import React, { useState } from 'react';
import { DirectoryNode, traversePreOrder, traverseInOrder, traversePostOrder } from './lib/utils';
import { TreeCanvas } from './components/TreeCanvas';
import { Play, Plus, Trash2, FolderTree, ArrowRight, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function App() {
  const [tree, setTree] = useState<DirectoryNode | null>({
    id: generateId(),
    name: 'root',
    left: null,
    right: null,
  });

  const [selectedNode, setSelectedNode] = useState<DirectoryNode | null>(tree);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  
  const [isTraversing, setIsTraversing] = useState(false);
  const [traversalOutput, setTraversalOutput] = useState<string[]>([]);
  const [traversalType, setTraversalType] = useState<string>('');

  const [newFolderName, setNewFolderName] = useState('');

  // DFS function to update node in tree
  const updateTree = (root: DirectoryNode | null, targetId: string, mutator: (node: DirectoryNode) => void): DirectoryNode | null => {
    if (!root) return null;
    
    // Deep clone approach to ensure state update triggers properly
    const clone: DirectoryNode = { ...root };
    
    if (clone.id === targetId) {
      mutator(clone);
      return clone;
    }
    
    clone.left = updateTree(clone.left, targetId, mutator);
    clone.right = updateTree(clone.right, targetId, mutator);
    return clone;
  };

  const handleAddChild = (side: 'left' | 'right') => {
    if (!selectedNode || !newFolderName.trim()) return;
    
    const newNode: DirectoryNode = {
      id: generateId(),
      name: newFolderName.trim(),
      left: null,
      right: null,
    };

    setTree(prevRoot => updateTree(prevRoot, selectedNode.id, (node) => {
      node[side] = newNode;
    }));
    
    setNewFolderName('');
  };

  const handleDeleteSubtree = () => {
    if (!selectedNode || !tree) return;
    
    if (tree.id === selectedNode.id) {
       // Cannot delete root, or if we do, clear everything
       setTree(null);
       setSelectedNode(null);
       return;
    }

    // Need a special mutator that drops the child
    const dropChild = (root: DirectoryNode | null): DirectoryNode | null => {
      if (!root) return null;
      const clone = { ...root };
      if (clone.left?.id === selectedNode.id) clone.left = null;
      if (clone.right?.id === selectedNode.id) clone.right = null;
      clone.left = dropChild(clone.left);
      clone.right = dropChild(clone.right);
      return clone;
    };
    
    setTree(dropChild(tree));
    setSelectedNode(null);
  };

  const startTraversal = async (type: 'pre' | 'in' | 'post') => {
    if (!tree || isTraversing) return;
    
    setIsTraversing(true);
    setTraversalType(type);
    setTraversalOutput([]);
    
    let generator: Generator<DirectoryNode>;
    if (type === 'pre') generator = traversePreOrder(tree);
    else if (type === 'in') generator = traverseInOrder(tree);
    else generator = traversePostOrder(tree);

    for (const node of generator) {
      setActiveNodeId(node.id);
      
      // Wait for animation to finish
      await new Promise(r => setTimeout(r, 600));
      
      setTraversalOutput(prev => [...prev, node.name]);
    }
    
    setActiveNodeId(null);
    setIsTraversing(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans flex flex-col">
      <header className="px-8 py-5 border-b border-slate-800 bg-[#0a0a0a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/50 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <FolderTree className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Binary File System</h1>
            <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">Traversal & Structuring Tool</p>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 min-h-0">
        
        {/* Left Side: Tree View */}
        <div className="lg:col-span-3 flex flex-col h-full min-h-[500px]">
          <TreeCanvas 
            tree={tree} 
            activeNodeId={activeNodeId}
            selectedNodeId={selectedNode?.id || null}
            onSelectNode={setSelectedNode}
          />
          
          {/* Output Log */}
          <div className="mt-6 p-4 rounded-xl bg-[#0a0a0a] border border-slate-800/80 min-h-[100px]">
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
              Traversal Output {traversalType ? `(${traversalType.toUpperCase()}-ORDER)` : ''}
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {traversalOutput.map((name, i) => (
                  <motion.div
                    key={`${i}-${name}`}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-sky-300 font-mono text-sm shadow-sm transition-all hover:bg-slate-700">
                      {name}
                    </span>
                    {i < traversalOutput.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {!traversalType && !isTraversing && (
                <span className="text-slate-600 font-mono text-sm italic">Execute a traversal to view log...</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-10 custom-scroll">
          
          {/* Context Panel */}
          <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-slate-800">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">Operations</h2>
            
            {!selectedNode ? (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/50 text-center text-sm text-slate-500 border-dashed">
                Select a folder on the canvas to add subdirectories.
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-8 h-8 rounded bg-sky-900/30 flex items-center justify-center text-sky-400">
                    <Folder className="w-4 h-4 fill-current opacity-40" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Selected Node</div>
                    <div className="text-sm font-mono font-bold text-sky-300">{selectedNode.name}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="New folder name..."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder-slate-600"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newFolderName) {
                        handleAddChild(!selectedNode.left ? 'left' : 'right');
                      }
                    }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddChild('left')}
                      disabled={!!selectedNode.left || !newFolderName || isTraversing}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 text-sm font-medium hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" /> Left
                    </button>
                    <button
                      onClick={() => handleAddChild('right')}
                      disabled={!!selectedNode.right || !newFolderName || isTraversing}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 text-sm font-medium hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" /> Right
                    </button>
                  </div>
                </div>

                {tree?.id !== selectedNode.id && (
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={handleDeleteSubtree}
                      disabled={isTraversing}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium active:scale-95"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Subtree
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Traversal Panel */}
          <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-slate-800">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">Traversal</h2>
            
            <div className="space-y-2">
              <button
                onClick={() => startTraversal('pre')}
                disabled={isTraversing || !tree}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-mono text-sm text-slate-300 font-bold group-hover:text-fuchsia-300 transition-colors">Pre-order</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Root → Left → Right</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 text-slate-500 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
              </button>

              <button
                onClick={() => startTraversal('in')}
                disabled={isTraversing || !tree}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-mono text-sm text-slate-300 font-bold group-hover:text-fuchsia-300 transition-colors">In-order</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Left → Root → Right</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 text-slate-500 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
              </button>

              <button
                onClick={() => startTraversal('post')}
                disabled={isTraversing || !tree}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-mono text-sm text-slate-300 font-bold group-hover:text-fuchsia-300 transition-colors">Post-order</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Left → Right → Root</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 text-slate-500 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
              </button>
            </div>
            
            {isTraversing && (
              <div className="mt-4 text-center text-xs font-mono text-fuchsia-400 animate-pulse">
                Traversing {traversalType.toUpperCase()} ...
              </div>
            )}
          </div>
          
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(51, 65, 85, 0.5);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(71, 85, 105, 0.8);
        }
      `}} />
    </div>
  );
}
