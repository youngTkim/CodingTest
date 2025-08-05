/// https://school.programmers.co.kr/learn/courses/30/lessons/42889

// 제한사항
// 스테이지의 개수 N은 1 이상 500 이하의 자연수이다.
// stages의 길이는 1 이상 200,000 이하이다.
// stages에는 1 이상 N + 1 이하의 자연수가 담겨있다.
// 각 자연수는 사용자가 현재 도전 중인 스테이지의 번호를 나타낸다.
// 단, N + 1 은 마지막 스테이지(N 번째 스테이지) 까지 클리어 한 사용자를 나타낸다.
// 만약 실패율이 같은 스테이지가 있다면 작은 번호의 스테이지가 먼저 오도록 하면 된다.
// 스테이지에 도달한 유저가 없는 경우 해당 스테이지의 실패율은 0 으로 정의한다.

let N1 = 5,
  stages1 = [2, 1, 2, 6, 2, 4, 3, 3]; // result: [3,4,2,1,5]
let N2 = 4,
  stages2 = [4, 4, 4, 4, 4]; // result: [4,1,2,3]

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
    // 실패율이 더 크거나, 실패율이 같고 스테이지 번호가 더 작을 때 교환
    if (
      this.heap[parentIdx].failRate < this.heap[idx].failRate ||
      (this.heap[parentIdx].failRate === this.heap[idx].failRate &&
        this.heap[parentIdx].stage > this.heap[idx].stage)
    ) {
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

    // 왼쪽 자식과 비교
    if (
      leftIdx < this.heap.length &&
      (this.heap[leftIdx].failRate > this.heap[maxIdx].failRate ||
        (this.heap[leftIdx].failRate === this.heap[maxIdx].failRate &&
          this.heap[leftIdx].stage < this.heap[maxIdx].stage))
    ) {
      maxIdx = leftIdx;
    }

    // 오른쪽 자식과 비교
    if (
      rightIdx < this.heap.length &&
      (this.heap[rightIdx].failRate > this.heap[maxIdx].failRate ||
        (this.heap[rightIdx].failRate === this.heap[maxIdx].failRate &&
          this.heap[rightIdx].stage < this.heap[maxIdx].stage))
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

function solution(N, stages) {
  let maxHeap = new MaxHeap();
  let result = [];

  for (let i = 1; i <= N; i++) {
    let remain = stages.filter((stage) => stage >= i);
    let failed = stages.filter((stage) => stage === i).length;
    let failRate = remain.length === 0 ? 0 : failed / remain.length;
    maxHeap.push({ stage: i, failRate: failRate });
  }

  // 힙에서 하나씩 pop해서 정렬된 결과 생성
  while (maxHeap.size() > 0) {
    result.push(maxHeap.pop().stage);
  }

  return result;
}

console.log(solution(N1, stages1));
console.log(solution(N2, stages2));
