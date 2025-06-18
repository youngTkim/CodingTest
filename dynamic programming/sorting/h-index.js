// https://school.programmers.co.kr/learn/courses/30/lessons/42747
const citations = [3, 0, 6, 1, 5]; // 3

function solution(citations) {
  citations.sort((a, b) => b - a);

  for (let i = 0; i < citations.length; i++) {
    if (citations[i] <= i) {
      return i;
    }
  }
  return citations.length;
}

console.log(solution(citations));
