// https://school.programmers.co.kr/learn/courses/30/lessons/42628

let operations1 = ["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"],
  operations2 = [
    "I -45",
    "I 653",
    "D 1",
    "I -642",
    "I 45",
    "I 97",
    "D 1",
    "D -1",
    "I 333",
  ];

class DualPriorityQueue {
  constructor() {
    this.maxHeap = []; // 최대 힙
    this.minHeap = []; // 최소 힙
    this.count = new Map(); // 각 숫자의 개수 추적
  }

  // 최대 힙에 삽입
  pushToMaxHeap(val) {
    this.maxHeap.push(val);
    this.bubbleUpMax(this.maxHeap.length - 1);
  }

  // 최소 힙에 삽입
  pushToMinHeap(val) {
    this.minHeap.push(val);
    this.bubbleUpMin(this.minHeap.length - 1);
  }

  // 최대 힙에서 최댓값 제거
  popFromMaxHeap() {
    if (this.maxHeap.length === 0) return null;
    if (this.maxHeap.length === 1) return this.maxHeap.pop();

    const max = this.maxHeap[0];
    this.maxHeap[0] = this.maxHeap.pop();
    this.bubbleDownMax(0);
    return max;
  }

  // 최소 힙에서 최솟값 제거
  popFromMinHeap() {
    if (this.minHeap.length === 0) return null;
    if (this.minHeap.length === 1) return this.minHeap.pop();

    const min = this.minHeap[0];
    this.minHeap[0] = this.minHeap.pop();
    this.bubbleDownMin(0);
    return min;
  }

  // 최대 힙 bubble up
  bubbleUpMax(idx) {
    if (idx === 0) return;
    const parentIdx = Math.floor((idx - 1) / 2);
    if (this.maxHeap[parentIdx] < this.maxHeap[idx]) {
      [this.maxHeap[parentIdx], this.maxHeap[idx]] = [
        this.maxHeap[idx],
        this.maxHeap[parentIdx],
      ];
      this.bubbleUpMax(parentIdx);
    }
  }

  // 최소 힙 bubble up
  bubbleUpMin(idx) {
    if (idx === 0) return;
    const parentIdx = Math.floor((idx - 1) / 2);
    if (this.minHeap[parentIdx] > this.minHeap[idx]) {
      [this.minHeap[parentIdx], this.minHeap[idx]] = [
        this.minHeap[idx],
        this.minHeap[parentIdx],
      ];
      this.bubbleUpMin(parentIdx);
    }
  }

  // 최대 힙 bubble down
  bubbleDownMax(idx) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let maxIdx = idx;

    if (
      leftIdx < this.maxHeap.length &&
      this.maxHeap[leftIdx] > this.maxHeap[maxIdx]
    ) {
      maxIdx = leftIdx;
    }
    if (
      rightIdx < this.maxHeap.length &&
      this.maxHeap[rightIdx] > this.maxHeap[maxIdx]
    ) {
      maxIdx = rightIdx;
    }

    if (maxIdx !== idx) {
      [this.maxHeap[idx], this.maxHeap[maxIdx]] = [
        this.maxHeap[maxIdx],
        this.maxHeap[idx],
      ];
      this.bubbleDownMax(maxIdx);
    }
  }

  // 최소 힙 bubble down
  bubbleDownMin(idx) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let minIdx = idx;

    if (
      leftIdx < this.minHeap.length &&
      this.minHeap[leftIdx] < this.minHeap[minIdx]
    ) {
      minIdx = leftIdx;
    }
    if (
      rightIdx < this.minHeap.length &&
      this.minHeap[rightIdx] < this.minHeap[minIdx]
    ) {
      minIdx = rightIdx;
    }

    if (minIdx !== idx) {
      [this.minHeap[idx], this.minHeap[minIdx]] = [
        this.minHeap[minIdx],
        this.minHeap[idx],
      ];
      this.bubbleDownMin(minIdx);
    }
  }

  // 원소 삽입
  insert(val) {
    this.pushToMaxHeap(val);
    this.pushToMinHeap(val);
    this.count.set(val, (this.count.get(val) || 0) + 1);
  }

  // 최댓값 삭제
  deleteMax() {
    while (this.maxHeap.length > 0) {
      const max = this.popFromMaxHeap();
      if (this.count.get(max) > 0) {
        this.count.set(max, this.count.get(max) - 1);
        return max;
      }
    }
    return null;
  }

  // 최솟값 삭제
  deleteMin() {
    while (this.minHeap.length > 0) {
      const min = this.popFromMinHeap();
      if (this.count.get(min) > 0) {
        this.count.set(min, this.count.get(min) - 1);
        return min;
      }
    }
    return null;
  }

  // 현재 최댓값 반환
  getMax() {
    while (this.maxHeap.length > 0) {
      const max = this.maxHeap[0];
      if (this.count.get(max) > 0) {
        return max;
      }
      this.popFromMaxHeap();
    }
    return null;
  }

  // 현재 최솟값 반환
  getMin() {
    while (this.minHeap.length > 0) {
      const min = this.minHeap[0];
      if (this.count.get(min) > 0) {
        return min;
      }
      this.popFromMinHeap();
    }
    return null;
  }

  // 큐가 비어있는지 확인
  isEmpty() {
    // count Map에서 유효한 원소가 있는지 확인
    for (const [val, cnt] of this.count) {
      if (cnt > 0) return false;
    }
    return true;
  }
}

function solution(operations) {
  const queue = new DualPriorityQueue();

  for (const operation of operations) {
    const [command, value] = operation.split(" ");

    if (command === "I") {
      // 숫자 삽입
      const num = parseInt(value);
      queue.insert(num);
    } else if (command === "D") {
      if (value === "1") {
        // 최댓값 삭제
        queue.deleteMax();
      } else if (value === "-1") {
        // 최솟값 삭제
        queue.deleteMin();
      }
    }
  }

  // 큐가 비어있으면 [0, 0] 반환
  if (queue.isEmpty()) {
    return [0, 0];
  }

  // 최댓값과 최솟값 반환
  const max = queue.getMax();
  const min = queue.getMin();

  return [max, min];
}

console.log(solution(operations1));
console.log(solution(operations2));
