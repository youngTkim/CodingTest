// https://school.programmers.co.kr/learn/courses/30/lessons/43165

let numbers1 = [4, 1, 2, 1];
let target1 = 4;

let numbers2 = [1, 2, 3, 4, 5];
let target2 = 3;

function solution(numbers, target) {
  let answer = 0;

  function dfs(index, sum) {
    if (index === numbers.length) {
      if (sum === target) answer++;
      return;
    }

    dfs(index + 1, sum + numbers[index]);
    dfs(index + 1, sum - numbers[index]);
  }

  dfs(0, 0);

  return answer;
}

console.log(solution(numbers1, target1));
console.log(solution(numbers2, target2));
