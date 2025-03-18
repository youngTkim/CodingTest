// https://school.programmers.co.kr/learn/courses/30/lessons/138476

let k = 6;
let tangerine = [1, 3, 2, 5, 4, 5, 2, 3];

function solution(k, tangerine) {
  let table = {};
  for (let i = 0; i < tangerine.length; i++) {
    if (table[tangerine[i]]) {
      table[tangerine[i]]++;
    } else {
      table[tangerine[i]] = 1;
    }
  }
  let sortedTable = Object.entries(table).sort((a, b) => b[1] - a[1]);
  let answer = 0;
  for (let i = 0; i < sortedTable.length; i++) {
    answer += sortedTable[i][1];
    if (answer >= k) {
      return i + 1;
    }
  }
  return answer;
}

console.log(solution(k, tangerine));
