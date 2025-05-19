/// https://school.programmers.co.kr/learn/courses/30/lessons/118667

let queue1 = [3, 2, 7, 2],
  queue2 = [4, 6, 5, 1];

function solution(queue1, queue2) {
  // 큐의 모든 원소를 합친 배열 생성
  const elements = [...queue1, ...queue2];
  const n = queue1.length;
  const total = elements.length;

  // 각 큐의 합 계산
  let sum1 = queue1.reduce((a, b) => a + b, 0);
  let sum2 = queue2.reduce((a, b) => a + b, 0);

  // 전체 합이 홀수면 동일하게 만들 수 없음
  if ((sum1 + sum2) % 2 !== 0) return -1;

  const target = (sum1 + sum2) / 2;

  // 두 포인터 사용 (p1: 큐1의 시작, p2: 큐1의 끝 + 1)
  let p1 = 0;
  let p2 = n;

  // 최대 순회 횟수 (전체 길이의 3배로 충분)
  for (let cnt = 0; cnt < total * 3; cnt++) {
    if (sum1 === target) {
      return cnt;
    }

    if (sum1 > target) {
      // 큐1에서 원소 제거
      const shifted = elements[p1++];
      if (p1 >= total) p1 = 0;
      sum1 -= shifted;
    } else {
      // 큐2에서 원소 가져오기
      const shifted = elements[p2++];
      if (p2 >= total) p2 = 0;
      sum1 += shifted;
    }

    // p1과 p2가 같아지면 (한쪽 큐가 비었다면) 불가능
    if (p1 === p2) {
      return -1;
    }
  }

  return -1;
}

console.log(solution(queue1, queue2));

function solution(queue1, queue2) {
  let sumQ1 = sum(queue1),
    sumQ2 = sum(queue2);

  let pointer1 = 0,
    pointer2 = queue1.length;

  const target = (sumQ1 + sumQ2) / 2;
  const queue = [...queue1, ...queue2];

  const end = queue1.length * 3;

  for (let count = 0; count < end; count++) {
    if (sumQ1 === target) {
      return count;
    }

    if (sumQ1 > target) {
      sumQ1 -= queue[pointer1++];
    } else {
      sumQ1 += queue[pointer2++];
    }
  }

  return -1;
}
