import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DirectoryNode = {
  id: string;
  name: string;
  left: DirectoryNode | null;
  right: DirectoryNode | null;
};

export type D3TreeNode = {
  id: string;
  name: string;
  isDummy: boolean;
  actualNode: DirectoryNode | null;
  children?: D3TreeNode[];
};

export function convertToD3(node: DirectoryNode | null): D3TreeNode | undefined {
  if (!node) return undefined;

  let children: D3TreeNode[] | undefined = undefined;

  if (node.left || node.right) {
    const leftChild = node.left
      ? convertToD3(node.left)!
      : { id: `dummy-left-${node.id}`, name: '', isDummy: true, actualNode: null };
    const rightChild = node.right
      ? convertToD3(node.right)!
      : { id: `dummy-right-${node.id}`, name: '', isDummy: true, actualNode: null };
    children = [leftChild, rightChild];
  }

  return {
    id: node.id,
    name: node.name,
    isDummy: false,
    actualNode: node,
    children,
  };
}

export function* traversePreOrder(node: DirectoryNode | null): Generator<DirectoryNode> {
  if (!node) return;
  yield node;
  yield* traversePreOrder(node.left);
  yield* traversePreOrder(node.right);
}

export function* traverseInOrder(node: DirectoryNode | null): Generator<DirectoryNode> {
  if (!node) return;
  yield* traverseInOrder(node.left);
  yield node;
  yield* traverseInOrder(node.right);
}

export function* traversePostOrder(node: DirectoryNode | null): Generator<DirectoryNode> {
  if (!node) return;
  yield* traversePostOrder(node.left);
  yield* traversePostOrder(node.right);
  yield node;
}
