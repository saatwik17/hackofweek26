import { useState, useCallback } from 'react';

export interface Customer {
  id: string;
  name: string;
  timeAdded: number;
}

export function useCircularQueue<T>(capacity: number) {
  const [items, setItems] = useState<Array<T | null>>(Array(capacity).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);

  const isFull = useCallback(() => {
    return (front === 0 && rear === capacity - 1) || (front === rear + 1);
  }, [front, rear, capacity]);

  const isEmpty = useCallback(() => {
    return front === -1;
  }, [front]);

  const enqueue = useCallback((item: T) => {
    if (isFull()) return false;
    
    let newFront = front;
    let newRear = rear;

    if (front === -1) {
      newFront = 0;
      newRear = 0;
    } else if (rear === capacity - 1 && front !== 0) {
      newRear = 0;
    } else {
      newRear = rear + 1;
    }

    setItems((prev) => {
      const newItems = [...prev];
      newItems[newRear] = item;
      return newItems;
    });
    setFront(newFront);
    setRear(newRear);
    return true;
  }, [front, rear, capacity, isFull]);

  const dequeue = useCallback(() => {
    if (isEmpty()) return null;

    const item = items[front];
    let newFront = front;
    let newRear = rear;

    setItems((prev) => {
      const newItems = [...prev];
      newItems[front] = null;
      return newItems;
    });

    if (front === rear) {
      newFront = -1;
      newRear = -1; // Queue becomes empty
    } else if (front === capacity - 1) {
      newFront = 0;
    } else {
      newFront = front + 1;
    }

    setFront(newFront);
    setRear(newRear);
    return item;
  }, [front, rear, capacity, isEmpty, items]);

  const reset = useCallback(() => {
    setItems(Array(capacity).fill(null));
    setFront(-1);
    setRear(-1);
  }, [capacity]);

  const size = useCallback(() => {
    if (front === -1) return 0;
    if (rear >= front) return rear - front + 1;
    return capacity - front + rear + 1;
  }, [front, rear, capacity]);

  return { items, front, rear, enqueue, dequeue, isFull, isEmpty, reset, size };
}
