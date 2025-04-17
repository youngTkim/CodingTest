// https://school.programmers.co.kr/learn/courses/30/lessons/42626

let scoville1 = [1, 2, 3, 9, 10, 12],
  K1 = 7; // 2

class MinHeap {
  constructor() {
    this.heap = [-1];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    // 부모 노드 자리를 바꿔가면서 가장 작은 값을 상단으로 끌어올리는 작업
    while (index > 1) {
      const parentIndex = Math.floor(index / 2);
      const temp = this.heap[index];
      if (temp < this.heap[parentIndex]) {
        this.heap[index] = this.heap[parentIndex];
        this.heap[parentIndex] = temp;
      }
      index = parentIndex;
    }
  }

  extractMin() {
    // 빈 힙이면 -1 반환
    if (this.heap.length === 1) return null;
    if (this.heap.length === 2) return this.heap.pop();
    // 가장 작은 값을 추출
    const min = this.heap[1];
    // 마지막 노드를 최상단으로 옮김
    this.heap[1] = this.heap.pop();
    // 최상단 노드를 자리에 맞게 배치
    this.bubbleDown();
    return min;
  }

  bubbleDown() {
    let index = 1;
    while (index < this.heap.length) {
      const leftChildIndex = index * 2;
      const rightChildIndex = index * 2 + 1;

      let smallestIndex = index; // 가장 작은 값의 인덱스

      // 왼쪽 자식이 존재하고 현재 노드보다 작으면 교체 후보로 설정
      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      // 오른쪽 자식이 존재하고 현재 교체 후보보다 작으면 교체 후보로 설정
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      // 교체할 필요가 없으면 종료
      if (smallestIndex === index) break;

      // 실제 노드 교체
      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];

      // 인덱스 업데이트
      index = smallestIndex;
    }
  }
}

function solution(scoville, K) {
  let answer = 0;
  let minheap = new MinHeap();
  for (let i = 0; i < scoville.length; i++) {
    minheap.insert(scoville[i]);
  }
  while (minheap.heap.length > 2 && minheap.heap[1] < K) {
    let least_spicy = minheap.extractMin();
    let second_least_spicy = minheap.extractMin();

    // 섞은 후 새 값 추가
    minheap.insert(least_spicy + second_least_spicy * 2);
    answer++;
  }

  // 최종 상태 확인
  if (minheap.heap.length > 1 && minheap.heap[1] < K) {
    return -1; // 불가능한 경우
  }
  return answer;
}

// class MinHeap {
//   constructor() {
//     this.heap = [null];
//   }

//   push(value) {
//     this.heap.push(value);
//     let currentIdx = this.heap.length - 1;
//     let parentIdx = Math.floor(currentIdx / 2);

//     while (parentIdx !== 0 && this.heap[parentIdx] > value) {
//       const temp = this.heap[parentIdx];
//       this.heap[parentIdx] = value;
//       this.heap[currentIdx] = temp;
//       currentIdx = parentIdx;
//       parentIdx = Math.floor(currentIdx / 2);
//     }
//   }

//   pop() {
//     // null과 원소 1개가 남았을 경우 나오지 않는 것을 대비
//     if (this.heap.length === 2) {
//       return this.heap.pop();
//     }

//     const returnValue = this.heap[1];
//     this.heap[1] = this.heap.pop();

//     let currentIdx = 1;
//     let leftIdx = 2;
//     let rightIdx = 3;

//     while (
//       this.heap[currentIdx] > this.heap[leftIdx] ||
//       this.heap[currentIdx] > this.heap[rightIdx]
//     ) {
//       if (this.heap[leftIdx] > this.heap[rightIdx]) {
//         const temp = this.heap[currentIdx];
//         this.heap[currentIdx] = this.heap[rightIdx];
//         this.heap[rightIdx] = temp;
//         currentIdx = rightIdx;
//       } else {
//         const temp = this.heap[currentIdx];
//         this.heap[currentIdx] = this.heap[leftIdx];
//         this.heap[leftIdx] = temp;
//         currentIdx = leftIdx;
//       }

//       leftIdx = currentIdx * 2;
//       rightIdx = currentIdx * 2 + 1;
//     }

//     return returnValue;
//   }

//   // 스코빌 지수가 value보다 커지면 false
//   isScoville(value) {
//     return this.heap[1] >= value;
//   }
// }

// function solution(scoville, K) {
//   const heap = new MinHeap();
//   let count = 0;

//   // heap에 push
//   scoville.forEach((el) => {
//     heap.push(el);
//   });

//   // heap class안에 size 함수를 만들었으면 더 좋았을 것 같다.
//   const length = heap.heap.length;

//   // 만약 heap안에 스코빌 지수가 요소가 존재하면 반복
//   while (!heap.isScoville(K)) {
//     // 배열의 길이보다 계산이 길어지는 것을 방지
//     if (count >= length - 1) break;

//     // 스코빌 지수 계산
//     const firstLowSpicy = heap.pop();
//     const secondLowSpicy = heap.pop();
//     const mixScoville = firstLowSpicy + secondLowSpicy * 2;
//     // 넣어주기
//     heap.push(mixScoville);
//     count++;
//   }

//   // 스코빌 지수가 더 이상 커지지 않으면 -1을 return
//   if (heap.pop() < K) {
//     return -1;
//   }

//   return count;
// }

console.log(solution(scoville1, K1));
