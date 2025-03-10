// https://school.programmers.co.kr/learn/courses/30/lessons/388352

let n1 = 10,
  q1 = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [3, 7, 8, 9, 10],
    [2, 5, 7, 9, 10],
    [3, 4, 5, 6, 7],
  ],
  ans1 = [2, 3, 4, 3, 3]; //result 3

function solution(n, q, ans) {
  // 1. 초기 설정: 빠른 검색을 위한 Set 변환
  const qSets = q.map((attempt) => new Set(attempt));

  // 2. 가능한 모든 조합 탐색 시작
  return findValidCombinations(n, q, ans, qSets);
}

// 가능한 비밀 코드 조합의 수를 찾는 함수
function findValidCombinations(n, q, ans, qSets) {
  // 숫자 선택 여부를 추적하는 배열
  const possibleNumbers = new Array(n + 1).fill(true);

  // 백트래킹으로 조합 탐색

  // 백트래킹 함수: 현재 위치, 현재까지 선택한 숫자들, 더 선택해야 할 숫자 개수
  function backtrack(position, selected, remaining) {
    // 종료 조건: 5개 숫자를 모두 선택한 경우
    if (remaining === 0) {
      return isValidCode(selected) ? 1 : 0;
    }

    // 불가능한 경우: 남은 숫자를 모두 선택해도 5개가 안 되는 경우
    if (position > n || position + remaining - 1 > n) {
      return 0;
    }

    let validCombinations = 0;

    // 현재 숫자를 선택하는 경우
    if (possibleNumbers[position]) {
      selected.push(position);
      validCombinations += backtrack(position + 1, selected, remaining - 1);
      selected.pop(); // 백트래킹
    }

    // 현재 숫자를 선택하지 않는 경우
    validCombinations += backtrack(position + 1, selected, remaining);

    return validCombinations;
  }

  // 선택한 조합이 모든 시도 결과와 일치하는지 검증
  function isValidCode(code) {
    for (let i = 0; i < q.length; i++) {
      // 현재 시도와 코드 사이의 일치하는 숫자 개수 계산
      let matchCount = 0;
      for (const num of code) {
        if (qSets[i].has(num)) {
          matchCount++;
        }
      }

      // 일치 개수가 예상과 다르면 유효하지 않음
      if (matchCount !== ans[i]) {
        return false;
      }
    }

    // 모든 시도와 일치하면 유효한 코드
    return true;
  }

  return backtrack(1, [], 5);
}

console.log(solution(n1, q1, ans1));
