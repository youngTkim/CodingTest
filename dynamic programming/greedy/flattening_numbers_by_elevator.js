// https://school.programmers.co.kr/learn/courses/30/lessons/148653
let storey1 = 16; // 6
let storey2 = 2554; // 16

function solution(storey) {
  let answer = 0;

  while (storey > 0) {
    const digit = storey % 10;
    storey = Math.floor(storey / 10);

    if (digit < 5) {
      answer += digit;
      continue;
    }

    if (digit > 5) {
      answer += 10 - digit;
      storey += 1; // 올림
      continue;
    }

    if (digit === 5) {
      const nextDigit = storey % 10;
      if (nextDigit >= 5) {
        answer += 10 - digit;
        storey += 1; // 올림
      } else {
        answer += digit;
      }
      continue;
    }
  }

  return answer;
}

console.log(solution(storey1)); // 6
console.log(solution(storey2)); // 16
