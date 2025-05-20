// https://school.programmers.co.kr/learn/courses/30/lessons/42883
let num1 = "1924",
  k1 = 2; //"94"
let num2 = "1231234",
  k2 = 3; //"3234"
let num3 = "4177252841",
  k3 = 4; //"775841"

function solution(number, k) {
  let stack = [];

  for (let i = 0; i < number.length; i++) {
    const currentDigit = number[i];

    while (k > 0 && stack.at(-1) !== undefined && stack.at(-1) < currentDigit) {
      stack.pop();
      k--;
    }

    stack.push(currentDigit);
  }

  // 모든 숫자를 처리한 후에도 k가 남아있으면 뒤에서부터 k개 제거
  stack = stack.slice(0, stack.length - k);

  return stack.join("");
}

console.log(solution(num1, k1)); // "94"
console.log(solution(num2, k2)); // "3234"
console.log(solution(num3, k3)); // "775841"
