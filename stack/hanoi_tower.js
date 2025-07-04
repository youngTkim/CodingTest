// https://school.programmers.co.kr/learn/courses/30/lessons/12946

function solution(n) {
  const answer = [];

  // 재귀적으로 하노이 탑을 해결하는 함수
  const hanoi = (n, from, to, mid) => {
    if (n === 1) {
      // 원판이 1개일 때는 바로 목적지로 이동
      answer.push([from, to]);
      return;
    }
    // 1. n-1개의 원판을 중간 기둥으로 이동
    hanoi(n - 1, from, mid, to);

    // 2. 가장 큰 원판을 목적지로 이동
    answer.push([from, to]);

    // 3. n-1개의 원판을 중간 기둥에서 목적지로 이동
    hanoi(n - 1, mid, to, from);
  };

  // 1번 기둥에서 3번 기둥으로 n개의 원판을 이동
  hanoi(n, 1, 3, 2);

  return answer;
}

// 테스트
console.log("n=2인 경우:", solution(2));
console.log("n=3인 경우:", solution(3));
