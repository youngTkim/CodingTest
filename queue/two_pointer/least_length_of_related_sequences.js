// https://school.programmers.co.kr/learn/courses/30/lessons/178870
let sequence1 = [1, 2, 3, 4, 5],
  k1 = 7; //	[2, 3]
let sequence2 = [1, 1, 1, 2, 3, 4, 5],
  k2 = 5; // [6, 6]
let sequence3 = [2, 2, 2, 2, 2],
  k3 = 6; //	[0, 2]

function solution(sequence, k) {
  const answer = [];
  let sum = 0;
  let leftpointer = 0;
  let rightpointer = 0;
  while (rightpointer < sequence.length) {
    sum += sequence[rightpointer];

    while (sum > k) {
      sum -= sequence[leftpointer];
      leftpointer++;
    }

    if (sum === k) {
      answer.push([leftpointer, rightpointer]);
    }

    rightpointer++;
  }

  return answer.sort((a, b) => a[1] - a[0] - (b[1] - b[0]))[0];
}

console.log(solution(sequence1, k1));
console.log(solution(sequence2, k2));
console.log(solution(sequence3, k3));
