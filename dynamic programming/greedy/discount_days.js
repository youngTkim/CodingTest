// https://school.programmers.co.kr/learn/courses/30/lessons/131127

let want1 = ["banana", "apple", "rice", "pork", "pot"],
  number1 = [3, 2, 2, 2, 1],
  discount1 = [
    "chicken",
    "apple",
    "apple",
    "banana",
    "rice",
    "apple",
    "pork",
    "banana",
    "pork",
    "rice",
    "pot",
    "banana",
    "apple",
    "banana",
  ];

function solution(want, number, discount) {
  let answer = 0;

  const want_map = new Map();
  for (let i = 0; i < want.length; i++) {
    want_map.set(want[i], number[i]);
  }

  for (let i = 0; i < discount.length - 9; i++) {
    const discount_map = new Map();
    for (let j = i; j < i + 10; j++) {
      discount_map.set(discount[j], (discount_map.get(discount[j]) || 0) + 1);
    }

    let is_match = true;
    for (let [key, value] of want_map) {
      if (discount_map.get(key) !== value) {
        is_match = false;
        break;
      }
    }

    if (is_match) {
      answer++;
    }
  }

  return answer;
}

console.log(solution(want1, number1, discount1));
