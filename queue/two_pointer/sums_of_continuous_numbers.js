// https://school.programmers.co.kr/learn/courses/30/lessons/12924

let n1 = 15;
let n2 = 30;

function solution(n) {
  let answer = 0;

  let sum = 0;
  let queue = [];

  for (let i = 1; i <= n; i++) {
    queue.push(i);
    sum += i;

    while (sum > n) {
      sum -= queue.shift();
    }

    if (sum === n) {
      answer++;
    }
  }

  return answer;
}

function solution2(n) {
  if (n === 1) return 1;
  let answer = 0;
  let start = 1;
  let end = 1;
  let sum = 1;

  while (start <= Math.ceil(n / 2)) {
    if (sum < n) {
      end++;
      sum += end;
    } else if (sum > n) {
      sum -= start;
      start++;
    } else {
      answer++;
      sum -= start;
      start++;
    }
  }

  return answer + 1;
}

// console.log(solution(n1));
console.log(solution(n2));
