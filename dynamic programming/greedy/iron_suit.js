// https://school.programmers.co.kr/learn/courses/30/lessons/12980

function solution(n) {
  let battery = 0;

  // n에서 0으로 돌아가는 과정을 시뮬레이션
  while (n > 0) {
    // 현재 위치가 홀수인 경우
    if (n % 2 === 1) {
      battery += 1; // 1칸 점프하여 건전지 1 소모
      n -= 1; // 위치 1 감소
    }
    // 현재 위치가 짝수인 경우
    n = n / 2; // 순간이동의 역연산 (건전지 소모 없음)
  }

  return battery;
}
