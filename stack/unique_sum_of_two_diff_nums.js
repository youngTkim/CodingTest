//https://school.programmers.co.kr/learn/courses/30/lessons/68644

let numbers1 = [2, 1, 3, 4, 1]; //[2, 3, 4, 5, 6, 7];
let numbers2 = [5, 0, 2, 7]; //[2,5,7,9,12];

function solution(numbers) {
  const answer = [];
  const DFS = (answer, current, start) => {
    if (current.length === 2) {
      if (!answer.includes(current.reduce((acc, cur) => acc + cur, 0))) {
        answer.push(current.reduce((acc, cur) => acc + cur, 0));
      }
      return answer;
    }
    for (let i = start; i < numbers.length; i++) {
      answer = DFS(answer, [...current, numbers[i]], i + 1);
    }
    return answer;
  };
  return DFS([], [], 0).sort((a, b) => a - b);
}

function solution2(numbers) {
  const temp = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      temp.push(numbers[i] + numbers[j]);
    }
  }

  const answer = [...new Set(temp)];

  return answer.sort((a, b) => a - b);
}

function solution(numbers) {
  const n = new Set();
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      n.add(numbers[i] + numbers[j]);
    }
  }
  return [...n].sort((a, b) => a - b);
}

let answer1 = solution(numbers1);
let answer2 = solution(numbers2);

console.log(answer1);
console.log(answer2);
