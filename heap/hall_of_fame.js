// https://school.programmers.co.kr/learn/courses/30/lessons/138477?language=javascript

class MinHeap {
  constructor() {
    this.heap = [-1]; // 인덱스 0은 사용하지 않음 (1부터 시작)
  }

  // 값 삽입
  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  // 최소값 추출
  extractMin() {
    if (this.heap.length === 1) return null; // 빈 힙
    if (this.heap.length === 2) return this.heap.pop(); // 원소 1개

    const min = this.heap[1]; // 최소값 (루트)
    this.heap[1] = this.heap.pop(); // 마지막 노드를 루트로 이동
    this.bubbleDown(); // 힙 속성 유지
    return min;
  }

  // 최소값 확인 (제거하지 않음)
  peek() {
    return this.heap.length > 1 ? this.heap[1] : null;
  }

  // 힙 크기
  size() {
    return this.heap.length - 1; // -1 제외
  }

  // bubbleUp: 삽입 후 힙 속성 유지 (부모보다 작으면 위로)
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 1) {
      const parentIndex = Math.floor(index / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break; // 힙 속성 만족

      // 부모와 교환
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 1;
    while (index < this.heap.length) {
      const leftChildIndex = index * 2;
      const rightChildIndex = index * 2 + 1;
      let smallestIndex = index;

      // 왼쪽 자식과 비교
      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      // 오른쪽 자식과 비교
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      // 교체할 필요 없으면 종료
      if (smallestIndex === index) break;

      // 자식과 교환
      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];
      index = smallestIndex;
    }
  }
}

function solution(k, score) {
  const answer = [];
  const minHeap = new MinHeap(); // 상위 k개 점수를 저장하는 MinHeap

  // 매일 점수를 처리
  for (let i = 0; i < score.length; i++) {
    // 오늘의 점수를 힙에 추가
    minHeap.insert(score[i]);

    // k개를 초과하면 최소값 제거 (상위 k개만 유지)
    if (minHeap.size() > k) {
      minHeap.extractMin();
    }

    // 현재 명예의 전당의 최하위 점수 (MinHeap의 루트)를 결과에 추가
    answer.push(minHeap.peek());
  }

  return answer;
}
