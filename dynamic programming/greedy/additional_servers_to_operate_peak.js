//https://school.programmers.co.kr/learn/courses/30/lessons/389479

let players1 = [
  0, 2, 3, 3, 1, 2, 0, 0, 0, 0, 4, 2, 0, 6, 0, 4, 2, 13, 3, 5, 10, 0, 1, 5,
];
let m1 = 3;
let k1 = 5;
// let result1 = 7;

let players2 = [
  0, 0, 0, 10, 0, 12, 0, 15, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 11, 0, 8, 0, 0, 0,
];
let m2 = 5;
let k2 = 1;
// let result2 = 11;

let players3 = [
  0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
];
let m3 = 1;
let k3 = 1;
// let result3 = 12;

function solution(players, m, k) {
  let answer = 0;
  const servers = new Array(24).fill(0); // 각 시간대별 운영 중인 서버 수

  for (let i = 0; i < 24; i++) {
    // 현재 시간대에 필요한 서버 개수
    const needed = Math.floor(players[i] / m);
    // 현재 운영 중인 서버 수
    const current = servers[i];
    // 추가로 필요한 서버 개수
    const additional = Math.max(0, needed - current);

    if (additional > 0) {
      // 서버 증설
      answer += additional;

      // 증설한 서버를 k시간 동안 운영
      for (let j = i; j < Math.min(24, i + k); j++) {
        servers[j] += additional;
      }
    }
  }

  return answer;
}

console.log(solution(players1, m1, k1));
console.log(solution(players2, m2, k2));
console.log(solution(players3, m3, k3));
