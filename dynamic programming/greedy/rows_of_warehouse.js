// https://school.programmers.co.kr/learn/courses/30/lessons/389478

let n1 = 22,
  w1 = 6,
  num1 = 8; // answer	3
let n2 = 13,
  w2 = 3,
  num2 = 6; // answer	4
// [
//   [13, 0, 0],
//   [12, 11, 10],
//   [7, 8, 9],
//   [6, 5, 4],
//   [1, 2, 3],
// ];

function solution(n, w, num) {
  let answer = 0;
  let arr = Array.from({ length: Math.ceil(n / w) }, (_, i) => {
    let cur = Array.from({ length: w }, (_, j) => {
      return i * w + j + 1 <= n ? i * w + j + 1 : null;
    });
    return i % 2 === 0 ? cur.reverse() : cur;
  });
  let cur_row_idx = arr.findIndex((row) => row.includes(num));
  let cur_col_idx = arr[cur_row_idx].findIndex((col) => col === num);
  while (cur_row_idx < arr.length && arr[cur_row_idx][cur_col_idx] !== null) {
    answer++;
    cur_row_idx++;
  }

  return answer;
}

let answer1 = solution(n1, w1, num1);
let answer2 = solution(n2, w2, num2);
console.log("answer1", answer1);
console.log("answer2", answer2);
