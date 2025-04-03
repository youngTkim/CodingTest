//https://school.programmers.co.kr/learn/courses/30/lessons/64065

let s = "{{2},{2,1},{2,1,3},{2,1,3,4}}";
let s2 = "{{20,111},{111}}";

function solution(s) {
  // 1. 문자열 처리: 바깥쪽 중괄호 제거 후 내부 집합들로 분리
  s = s.slice(2, -2);
  let arr = s.split("},{");

  // 2. 각 집합 문자열을 숫자 배열로 변환
  let sets = arr.map((item) => item.split(",").map(Number));

  // 3. 집합 크기에 따라 정렬
  sets.sort((a, b) => a.length - b.length);
  //   console.log(sets);

  // 4. 튜플 추출: 각 단계에서 새로 등장하는 요소가 튜플의 다음 요소
  let result = [];
  let seen = new Set();

  for (let set of sets) {
    for (let num of set) {
      if (!seen.has(num)) {
        result.push(num);
        seen.add(num);
        break; // 새로운 요소를 찾으면 다음 집합으로 이동
      }
    }
  }

  return result;
}

console.log(solution(s)); // [2, 1, 3, 4]
console.log(solution(s2)); // [111, 20]
