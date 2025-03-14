//https://school.programmers.co.kr/learn/courses/30/lessons/76502

function solution(s) {
  let answer = 0;

  // 짝을 이루는 괄호 정의
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  function isCorrect(str) {
    const stack = [];

    for (let char of str) {
      // 여는 괄호인 경우
      if (char === "(" || char === "[" || char === "{") {
        stack.push(char);
      }
      // 닫는 괄호인 경우
      else {
        // 스택이 비어있거나 짝이 맞지 않으면 올바르지 않음
        if (stack.length === 0 || stack.pop() !== pairs[char]) {
          return false;
        }
      }
    }

    // 모든 괄호가 짝을 이루면 스택이 비어있어야 함
    return stack.length === 0;
  }

  // 모든 회전 케이스 검사
  for (let i = 0; i < s.length; i++) {
    if (isCorrect(s)) {
      answer++;
    }
    s = s.slice(1) + s[0]; // 문자열을 왼쪽으로 한 칸 회전
  }

  return answer;
}

console.log(solution("[](){}"));
