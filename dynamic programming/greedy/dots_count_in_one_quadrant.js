// https://school.programmers.co.kr/learn/courses/30/lessons/140107

let k1 = 2,
  d1 = 4; // 6
let k2 = 1,
  d2 = 5; // 26

function solution(k, d) {
  let answer = 0;

  for (let i = 0; i <= d; i += k) {
    const y = Math.floor(Math.sqrt(d ** 2 - i ** 2));
    answer += Math.floor(y / k) + 1;
  }

  return answer;
}

console.log(solution(k1, d1));
console.log(solution(k2, d2));
