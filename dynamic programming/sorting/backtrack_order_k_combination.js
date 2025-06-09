// https://school.programmers.co.kr/learn/courses/30/lessons/12936/solution_groups?language=javascript

function factorial(num) {
  if (num <= 1) return 1;
  return num * factorial(num - 1);
}

function solution(n, k) {
  const numbers = [];
  for (let i = 1; i <= n; i++) {
    numbers.push(i);
  }

  const result = [];
  let remaining = k - 1; // 0-based 인덱스로 변환

  // 각 자릿수별로 계산
  for (let i = 0; i < n; i++) {
    const fact = factorial(n - 1 - i); // (n-1-i)!
    const index = Math.floor(remaining / fact); // 현재 자리에 올 숫자의 인덱스

    // 해당 인덱스의 숫자를 결과에 추가
    result.push(numbers[index]);
    // 사용한 숫자는 제거
    numbers.splice(index, 1);
    // 나머지 계산
    remaining = remaining % fact;
  }

  return result;
}

// 테스트
console.log(solution(3, 5)); // [3, 1, 2]
console.log(solution(4, 9)); // [2, 1, 4, 3]
