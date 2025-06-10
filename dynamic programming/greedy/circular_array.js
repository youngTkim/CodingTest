// https://school.programmers.co.kr/learn/courses/30/lessons/131701
let elements1 = [7, 9, 1, 1, 4]; //18

function solution(elements) {
  let targetLength = 1;
  let maxTargetLength = elements.length;
  elements = [...elements, ...elements];
  let result = new Set();
  while (targetLength <= maxTargetLength) {
    for (let i = 0; i < elements.length - targetLength + 1; i++) {
      let sumOfTargetLengthSlice = elements
        .slice(i, i + targetLength)
        .reduce((acc, curr) => acc + curr, 0);
      result.add(sumOfTargetLengthSlice);
    }
    targetLength++;
  }
  return result.size;
}

console.log(solution(elements1));
