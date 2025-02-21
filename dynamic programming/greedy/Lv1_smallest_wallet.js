// https://school.programmers.co.kr/learn/courses/30/lessons/86491

let sizes1 = [
  [60, 50],
  [30, 70],
  [60, 30],
  [80, 40],
];

let sizes2 = [
  [10, 7],
  [12, 3],
  [8, 15],
  [14, 7],
  [5, 15],
];

let sizes3 = [
  [14, 4],
  [19, 6],
  [6, 16],
  [18, 7],
  [7, 11],
];

function solution(sizes) {
  let maxWidth = 0;
  let maxHeight = 0;

  for (let [width, height] of sizes) {
    // 긴 쪽을 width로, 짧은 쪽을 height로 설정
    // 가장 작은 지갑을 만들 때에는 가로와 세로의 값의 차가 가장 커야지 넓이가 작아지게 된다.
    // ex) 14 * 4 는 56의 넓이를 가지지만, 10 * 8 은 80의 넓이를 가지기 때문에 14 * 4 의 지갑이 더 작은 넓이를 가지게 된다.
    const longer = Math.max(width, height);
    const shorter = Math.min(width, height);

    maxWidth = Math.max(maxWidth, longer);
    maxHeight = Math.max(maxHeight, shorter);
  }

  return maxWidth * maxHeight;
}

let answer1 = solution(sizes1);
let answer2 = solution(sizes2);
let answer3 = solution(sizes3);
console.log("answer1", answer1);
console.log("answer2", answer2);
console.log("answer3", answer3);
