// https://school.programmers.co.kr/learn/courses/30/lessons/132265

let topping1 = [1, 2, 1, 3, 1, 4, 1, 2], //	2
  topping2 = [1, 2, 3, 1, 4]; // 0

function solution(topping) {
  let answer = 0;
  let left = new Map();
  let right = new Map();
  for (let i = 0; i < topping.length; i++) {
    right.set(topping[i], (right.get(topping[i]) || 0) + 1);
  }
  for (let i = 0; i < topping.length; i++) {
    left.set(topping[i], (left.get(topping[i]) || 0) + 1);

    right.set(topping[i], right.get(topping[i]) - 1);
    if (right.get(topping[i]) === 0) {
      right.delete(topping[i]);
    }
    if (left.size === right.size) {
      answer++;
    }
  }
  return answer;
}

console.log(solution(topping1));
console.log(solution(topping2));
