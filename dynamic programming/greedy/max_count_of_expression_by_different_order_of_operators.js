/// https://school.programmers.co.kr/learn/courses/30/lessons/67257
let expression1 = "100-200*300-500+20"; // 60420
let expression2 = "50*6-3*2"; // 300

function solution(expression) {
  // 가능한 모든 우선순위 조합을 직접 정의
  const priorities = [
    ["*", "+", "-"],
    ["*", "-", "+"],
    ["+", "*", "-"],
    ["+", "-", "*"],
    ["-", "*", "+"],
    ["-", "+", "*"],
  ];

  // 수식을 숫자와 연산자로 분리
  const tokens = expression.split(/(\D)/);

  // 각 우선순위 조합에 대해 계산
  const results = priorities.map((priority) => {
    const tokens_copy = [...tokens];

    // 각 연산자 우선순위대로 계산
    priority.forEach((operator) => {
      let i = 1;
      while (i < tokens_copy.length) {
        if (tokens_copy[i] === operator) {
          // 계산 수행
          const result = calculate(
            Number(tokens_copy[i - 1]),
            tokens_copy[i],
            Number(tokens_copy[i + 1])
          );

          // 계산 결과로 토큰 업데이트
          tokens_copy.splice(i - 1, 3, result);
          i = 1; // 처음부터 다시 검사
        } else {
          i += 2;
        }
      }
    });

    return Math.abs(Number(tokens_copy[0]));
  });

  return Math.max(...results);
}

// 계산 함수
function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    default:
      return 0;
  }
}

console.log(solution(expression1));
console.log(solution(expression2));
