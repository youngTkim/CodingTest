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

// console.log(solution(n1));
console.log(solution(n2));
