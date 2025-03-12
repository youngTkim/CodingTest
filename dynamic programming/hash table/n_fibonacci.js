// https://school.programmers.co.kr/learn/courses/30/lessons/12945

function solution(n) {
  // 피보나치 수열의 값을 저장할 객체
  let table = {
    0: 0,
    1: 1,
    2: 1,
  };

  // 3부터 n까지 피보나치 수열 계산
  for (let i = 3; i <= n; i++) {
    // 모듈러 연산의 분배법칙 적용: (a + b) % c = ((a % c) + (b % c)) % c
    table[i] = (table[i - 1] + table[i - 2]) % 1234567;
  }

  // n번째 피보나치 수를 반환
  return table[n];
}

console.log(solution(100000));
