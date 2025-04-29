/// https://school.programmers.co.kr/learn/courses/30/lessons/12913

let land1 = [
  [1, 2, 3, 5],
  [5, 6, 7, 8],
  [4, 3, 2, 1],
]; // 16

function solution(land) {
  // dp 배열 초기화 (첫 번째 행은 land의 첫 번째 행으로 초기화)
  const dp = Array.from({ length: land.length }, () =>
    Array(land[0].length).fill(0)
  );

  dp[0] = [...land[0]];

  // 두 번쨰 행부터 각 행을 순회하며 최대값 계산
  for (let i = 1; i < land.length; i++) {
    for (let j = 0; j < land[0].length; j++) {
      // 이전 행에서 현재 열(j)을 제외한 다른 열 중 최댓값을 선택
      const maxPrevious = Math.max(...dp[i - 1].filter((k, idx) => idx !== j));
      // 현재 위치의 점수 + 이전 행에서의 최대값
      dp[i][j] = land[i][j] + maxPrevious;
    }
  }
  // 마지막 행에서 최대값 반환
  return Math.max(...dp[land.length - 1]);
}

function solution2(land) {
  let answer = 0;
  const dp = [land[0]];

  for (let i = 1; i < land.length; i++) {
    const column = [];

    column.push(
      Math.max(dp[i - 1][1], dp[i - 1][2], dp[i - 1][3]) + land[i][0]
    );
    column.push(
      Math.max(dp[i - 1][0], dp[i - 1][2], dp[i - 1][3]) + land[i][1]
    );
    column.push(
      Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][3]) + land[i][2]
    );
    column.push(
      Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]) + land[i][3]
    );
    dp.push(column);
  }

  return Math.max(
    dp[land.length - 1][0],
    dp[land.length - 1][1],
    dp[land.length - 1][2],
    dp[land.length - 1][3]
  );
}
console.log(solution(land1));
