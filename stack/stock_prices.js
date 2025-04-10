// https://school.programmers.co.kr/learn/courses/30/lessons/42584

let prices = [1, 2, 3, 2, 3]; //[4, 3, 1, 1, 0]

function solution(prices) {
  let answer = [];
  let stack = [];
  for (let i = 0; i < prices.length; i++) {
    const cur_price = prices[i];
    while (stack.length > 0 && prices[stack.at(-1)] > cur_price) {
      const max_price_index = stack.pop();
      answer[max_price_index] = i - max_price_index;
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    const max_price_index = stack.pop();
    answer[max_price_index] = prices.length - 1 - max_price_index;
  }

  return answer;
}

console.log(solution(prices));
