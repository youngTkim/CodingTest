// https://school.programmers.co.kr/learn/courses/30/lessons/60057
let s1 = "aabbaccc"; //7
let s2 = "ababcdcdababcdcd"; //9
let s3 = "abcabcdede"; //8
let s4 = "abcabcabcabcdededededede"; //14
let s5 = "xababcdcdababcdcd"; //17

function getCompressed(s, unitLength) {
  let compressed = "";
  let i = 0;

  while (i < s.length) {
    const currentUnit = s.slice(i, i + unitLength);
    let count = 1;

    // 같은 단위가 몇 번 반복되는지 확인 ex) {n}ab
    while (true) {
      const nextIndex = i + unitLength * count;

      // 측정 범위가 원본 문자열 길이를 넘어서면 break
      if (nextIndex >= s.length) break;

      // currentUnit과 같이 길이의 다음 slice가 동일한 문자열인지 확인
      const nextUnit = s.slice(nextIndex, nextIndex + unitLength);
      // 동일하지 않으면 break;
      if (nextUnit !== currentUnit) break;

      count++;
    }

    // 압축된 문자열에 추가
    compressed += (count > 1 ? count : "") + currentUnit;

    // 다음 위치로 이동
    i += unitLength * count;
  }

  return compressed;
}

function solution(s) {
  let minLength = s.length; // 압축되지 않은 원본 길이가 최대값

  // 1부터 문자열 길이의 절반까지 모든 단위 길이 시도
  for (
    let unitLength = 1;
    unitLength <= Math.floor(s.length / 2);
    unitLength++
  ) {
    let compressed = getCompressed(s, unitLength);
    console.log(`${unitLength} : ${compressed}`);
    minLength = Math.min(minLength, compressed.length);
  }

  return minLength;
}

console.log("=== s1 ===");
console.log("원본 : ", s1);
console.log(solution(s1));

console.log("=== s2 ===");
console.log("원본 : ", s2);
console.log(solution(s2));

console.log("=== s3 ===");
console.log("원본 : ", s3);
console.log(solution(s3));

console.log("=== s4 ===");
console.log("원본 : ", s4);
console.log(solution(s4));

console.log("=== s5 ===");
console.log("원본 : ", s5);
console.log(solution(s5));
