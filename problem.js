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
  // 각 숫자가 비밀 코드에 포함될 수 있는지 여부를 추적
  const possibleNumbers = new Array(n + 1).fill(true);

  // 각 시도에서 사용된 숫자들을 Set으로 변환하여 빠른 검색 가능하게 함
  const qSets = q.map((attempt) => new Set(attempt));

  // 가능한 조합 수를 세는 함수
  function countValidCombinations(index, current, remainingToSelect) {
    // 기저 조건: 5개 숫자를 모두 선택했을 때
    if (remainingToSelect === 0) {
      // 모든 시도에 대해 검증
      for (let i = 0; i < q.length; i++) {
        let matches = 0;
        for (const num of current) {
          if (qSets[i].has(num)) {
            matches++;
          }
        }

        if (matches !== ans[i]) {
          return 0; // 유효하지 않은 조합
        }
      }
      return 1; // 유효한 조합
    }

    // 남은 숫자를 모두 선택해도 5개가 안 되는 경우
    if (index > n || index + remainingToSelect - 1 > n) {
      return 0;
    }

    let count = 0;

    // 현재 숫자를 선택하는 경우
    if (possibleNumbers[index]) {
      current.push(index);
      count += countValidCombinations(
        index + 1,
        current,
        remainingToSelect - 1
      );
      current.pop();
    }

    // 현재 숫자를 선택하지 않는 경우
    count += countValidCombinations(index + 1, current, remainingToSelect);

    return count;
  }

  // 첫 번째 시도와 응답을 기반으로 가능한 숫자 필터링 (최적화)
  if (q.length > 0) {
    const firstAttempt = new Set(q[0]);
    const firstResponse = ans[0];

    // 첫 번째 시도에 포함된 숫자 중 최소한 firstResponse개는 비밀 코드에 포함되어야 함
    // 첫 번째 시도에 포함되지 않은 숫자 중 최소한 (5 - firstResponse)개는 비밀 코드에 포함되어야 함

    // 극단적인 경우 필터링 (모든 숫자가 포함되거나 제외되는 경우)
    if (firstResponse === 0) {
      // 첫 번째 시도의 모든 숫자는 비밀 코드에 포함될 수 없음
      for (const num of firstAttempt) {
        possibleNumbers[num] = false;
      }
    } else if (firstResponse === 5) {
      // 첫 번째 시도의 모든 숫자는 비밀 코드에 포함되어야 함
      for (let i = 1; i <= n; i++) {
        if (!firstAttempt.has(i)) {
          possibleNumbers[i] = false;
        }
      }
    }
  }

  return countValidCombinations(1, [], 5);
}
