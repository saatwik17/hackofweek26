export class SongNode {
  id: string;
  title: string;
  artist: string;
  color: string;
  prev: SongNode | null = null;
  next: SongNode | null = null;

  constructor(title: string, artist: string, color: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.artist = artist;
    this.color = color;
  }
}

export class DoublyLinkedList {
  head: SongNode | null = null;
  tail: SongNode | null = null;
  size: number = 0;

  addFront(title: string, artist: string, color: string): void {
    const newNode = new SongNode(title, artist, color);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  addEnd(title: string, artist: string, color: string): void {
    const newNode = new SongNode(title, artist, color);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  deleteAt(index: number): SongNode | null {
    if (index < 0 || index >= this.size || !this.head) return null;
    let current = this.head;

    if (index === 0) {
      this.head = current.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
    } else if (index === this.size - 1) {
      current = this.tail!;
      this.tail = current.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
    } else {
      for (let i = 0; i < index; i++) {
        current = current.next!;
      }
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
    }
    this.size--;
    return current;
  }

  reverse(): void {
    if (!this.head || !this.head.next) return;

    let current: SongNode | null = this.head;
    let temp: SongNode | null = null;

    // Swap next and prev for all nodes
    while (current !== null) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      
      // Move to the "next" node, which is now stored in current.prev
      current = current.prev;
    }

    // Swap head and tail
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }

  toArray(): SongNode[] {
    const result: SongNode[] = [];
    let current = this.head;
    while (current) {
      result.push(current);
      current = current.next;
    }
    return result;
  }
}
