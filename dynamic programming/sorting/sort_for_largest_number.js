/// https://school.programmers.co.kr/learn/courses/30/lessons/42746

let numbers1 = [6, 10, 2]; //"6210"
let numbers2 = [3, 30, 34, 5, 9]; //"9534330"

function solution(numbers) {
  const result = numbers
    .map((number) => String(number))
    .sort((a, b) => {
      return b + a - (a + b);
    })
    .join("");

  // 첫 번째 문자가 '0'이면 모든 숫자가 0이므로 "0"을 반환
  return result[0] === "0" ? "0" : result;
}

console.log(solution(numbers1));
console.log(solution(numbers2));
