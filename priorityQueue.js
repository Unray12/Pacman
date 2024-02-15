class PriorityQueue {
    constructor() {
        this.items = []; //item {item: {x: 0, y: 10}, priority: 2}
    }

    enqueue(item, priority) {
        this.items.push({item: item, priority: priority});
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift().item;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}