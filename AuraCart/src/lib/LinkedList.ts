export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  cartItemId: string;
}

export class Node {
  data: CartItem;
  next: Node | null = null;

  constructor(data: CartItem) {
    this.data = data;
  }
}

export class LinkedList {
  head: Node | null = null;
  tail: Node | null = null;
  size: number = 0;

  // Deep clone ensures React state updates work flawlessly by creating entirely new nodes
  deepClone(): LinkedList {
    const newList = new LinkedList();
    let current = this.head;
    while (current) {
      const newNode = new Node({ ...current.data });
      if (!newList.tail) {
        newList.head = newNode;
        newList.tail = newNode;
      } else {
        newList.tail.next = newNode;
        newList.tail = newNode;
      }
      newList.size++;
      current = current.next;
    }
    return newList;
  }

  addAtHead(data: CartItem): LinkedList {
    const list = this.deepClone();
    const newNode = new Node(data);
    if (!list.head) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      newNode.next = list.head;
      list.head = newNode;
    }
    list.size++;
    return list;
  }

  addAtTail(data: CartItem): LinkedList {
    const list = this.deepClone();
    const newNode = new Node(data);
    if (!list.tail) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      list.tail.next = newNode;
      list.tail = newNode;
    }
    list.size++;
    return list;
  }

  removeById(cartItemId: string): LinkedList {
    const list = this.deepClone();
    if (!list.head) return list;

    if (list.head.data.cartItemId === cartItemId) {
      list.head = list.head.next;
      if (!list.head) {
        list.tail = null;
      }
      list.size--;
      return list;
    }

    let current = list.head;
    while (current.next && current.next.data.cartItemId !== cartItemId) {
      current = current.next;
    }

    if (current.next) {
      if (current.next === list.tail) {
        list.tail = current;
      }
      current.next = current.next.next;
      list.size--;
    }

    return list;
  }

  toArray(): CartItem[] {
    const result: CartItem[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  getTotal(): number {
    let total = 0;
    let current = this.head;
    while (current) {
      total += current.data.price;
      current = current.next;
    }
    return total;
  }
}
