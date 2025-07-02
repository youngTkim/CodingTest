// https://school.programmers.co.kr/learn/courses/30/lessons/142085
let n1 = 7;
let k1 = 3;
let enemy1 = [4, 2, 4, 5, 3, 3, 1];
// result1 = 5;

let n2 = 2;
let k2 = 4;
let enemy2 = [3, 3, 3, 3];
// result2 = 4;

function solution(n, k, enemy) {
  let usedSoldiers = 0;
  const usedEnemies = []; // 병사로 막은 적들을 저장

  for (let i = 0; i < enemy.length; i++) {
    const currentEnemy = enemy[i];

    // 1. 일단 병사로 막기 시도
    usedSoldiers += currentEnemy;
    usedEnemies.push(currentEnemy);

    // 2. 병사가 부족하면 조정 필요
    if (usedSoldiers > n) {
      if (k > 0) {
        // 가장 큰 적을 무적권으로 처리
        usedEnemies.sort((a, b) => b - a); // 내림차순 정렬 (큰 것부터)
        const maxEnemy = usedEnemies.shift();
        usedSoldiers -= maxEnemy;
        k--;
      } else {
        // 무적권도 없으면 게임 종료
        return i;
      }
    }
  }

  return enemy.length;
}

console.log(solution(n1, k1, enemy1));
console.log(solution(n2, k2, enemy2));

// 효율적인 최대힙 구현
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return max;
  }

  bubbleUp(idx) {
    if (idx === 0) return;
    const parentIdx = Math.floor((idx - 1) / 2);
    if (this.heap[parentIdx] < this.heap[idx]) {
      [this.heap[parentIdx], this.heap[idx]] = [
        this.heap[idx],
        this.heap[parentIdx],
      ];
      this.bubbleUp(parentIdx);
    }
  }

  bubbleDown(idx) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let maxIdx = idx;

    if (leftIdx < this.heap.length && this.heap[leftIdx] > this.heap[maxIdx]) {
      maxIdx = leftIdx;
    }
    if (
      rightIdx < this.heap.length &&
      this.heap[rightIdx] > this.heap[maxIdx]
    ) {
      maxIdx = rightIdx;
    }

    if (maxIdx !== idx) {
      [this.heap[idx], this.heap[maxIdx]] = [this.heap[maxIdx], this.heap[idx]];
      this.bubbleDown(maxIdx);
    }
  }

  size() {
    return this.heap.length;
  }
}

// 효율적인 solution2 (MaxHeap 사용)
function solution2(n, k, enemy) {
  let usedSoldiers = 0;
  const maxHeap = new MaxHeap();

  for (let i = 0; i < enemy.length; i++) {
    const currentEnemy = enemy[i];

    // 1. 병사로 막기
    usedSoldiers += currentEnemy;
    maxHeap.push(currentEnemy);

    // 2. 병사 부족시 조정
    if (usedSoldiers > n) {
      if (k > 0 && maxHeap.size() > 0) {
        const maxEnemy = maxHeap.pop();
        usedSoldiers -= maxEnemy;
        k--;
      } else {
        return i;
      }
    }
  }

  return enemy.length;
}

console.log("\n=== 성능 비교 ===");
console.time("기존방식");
console.log("결과1:", solution(n1, k1, enemy1));
console.log("결과2:", solution(n2, k2, enemy2));
console.timeEnd("기존방식");

console.time("힙방식");
console.log("결과1:", solution2(n1, k1, enemy1));
console.log("결과2:", solution2(n2, k2, enemy2));
console.timeEnd("힙방식");
