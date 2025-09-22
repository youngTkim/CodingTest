// https://school.programmers.co.kr/learn/courses/30/lessons/42898

// 문제 설명
// 계속되는 폭우로 일부 지역이 물에 잠겼습니다.
// 물에 잠기지 않은 지역을 통해 학교를 가려고 합니다.
// 집에서 학교까지 가는 길은 m x n 크기의 격자모양으로 나타낼 수 있습니다.

// 아래 그림은 m = 4, n = 3 인 경우입니다.

// image0.png

// 가장 왼쪽 위, 즉 집이 있는 곳의 좌표는 (1, 1)로 나타내고 가장 오른쪽 아래, 즉 학교가 있는 곳의 좌표는 (m, n)으로 나타냅니다.

// 격자의 크기 m, n과 물이 잠긴 지역의 좌표를 담은 2차원 배열 puddles이 매개변수로 주어집니다.
//  오른쪽과 아래쪽으로만 움직여 집에서 학교까지 갈 수 있는 최단경로의 개수를 1,000,000,007로 나눈 나머지를 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 격자의 크기 m, n은 1 이상 100 이하인 자연수입니다.
// m과 n이 모두 1인 경우는 입력으로 주어지지 않습니다.
// 물에 잠긴 지역은 0개 이상 10개 이하입니다.
// 집과 학교가 물에 잠긴 경우는 입력으로 주어지지 않습니다.
// 입출력 예
// m	n	puddles	return
// 4	3	[[2, 2]]	4
// 입출력 예 설명

let m = 4;
let n = 3;
let puddles = [[2, 2]]; // 4

function solution(m, n, puddles) {
  // 1. Set을 사용하여 물에 잠긴 지역을 빠르게 찾기
  const puddleSet = new Set();
  for (const [x, y] of puddles) {
    puddleSet.add(`${y - 1},${x - 1}`); // 좌표를 문자열로 변환하여 저장
  }

  // 2. DP 배열 초기화
  const dp = Array.from({ length: n }, () => Array(m).fill(0));
  dp[0][0] = 1;

  // 3. 첫 번째 행 처리 (왼쪽에서만 올 수 있음)
  for (let j = 1; j < m; j++) {
    if (!puddleSet.has(`0,${j}`)) {
      dp[0][j] = dp[0][j - 1];
    }
  }

  // 4. 첫 번째 열 처리 (위에서만 올 수 있음)
  for (let i = 1; i < n; i++) {
    if (!puddleSet.has(`${i},0`)) {
      dp[i][0] = dp[i - 1][0];
    }
  }

  // 5. 나머지 영역 처리
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (!puddleSet.has(`${i},${j}`)) {
        dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000007;
      }
    }
  }

  return dp[n - 1][m - 1];
}

// 기존 방법 (비교용)
function solution_old(m, n, puddles) {
  let dp = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < puddles.length; i++) {
    const [x, y] = puddles[i];
    dp[y - 1][x - 1] = -1;
  }

  dp[0][0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if ((i === 0 && j === 0) || dp[i][j] === -1) {
        continue;
      }

      let paths = 0;

      if (i > 0 && dp[i - 1][j] !== -1) {
        paths += dp[i - 1][j];
      }

      if (j > 0 && dp[i][j - 1] !== -1) {
        paths += dp[i][j - 1];
      }

      dp[i][j] = paths % 1000000007;
    }
  }

  return dp[n - 1][m - 1];
}

// 성능 테스트 함수
function performanceTest() {
  const testCases = [
    { m: 4, n: 3, puddles: [[2, 2]] },
    {
      m: 10,
      n: 10,
      puddles: [
        [3, 3],
        [7, 7],
      ],
    },
    {
      m: 50,
      n: 50,
      puddles: [
        [10, 10],
        [20, 20],
        [30, 30],
      ],
    },
    {
      m: 100,
      n: 100,
      puddles: [
        [25, 25],
        [50, 50],
        [75, 75],
      ],
    },
  ];

  console.log("=== 성능 비교 테스트 ===\n");

  testCases.forEach((testCase, index) => {
    const { m, n, puddles } = testCase;

    // 기존 방법 테스트
    const start1 = performance.now();
    const result1 = solution_old(m, n, puddles);
    const end1 = performance.now();
    const time1 = end1 - start1;

    // 개선된 방법 테스트
    const start2 = performance.now();
    const result2 = solution(m, n, puddles);
    const end2 = performance.now();
    const time2 = end2 - start2;

    console.log(
      `테스트 케이스 ${index + 1}: ${m}×${n}, puddles: ${puddles.length}개`
    );
    console.log(`기존 방법: ${time1.toFixed(4)}ms, 결과: ${result1}`);
    console.log(`개선 방법: ${time2.toFixed(4)}ms, 결과: ${result2}`);
    console.log(`성능 향상: ${(((time1 - time2) / time1) * 100).toFixed(2)}%`);
    console.log(`결과 일치: ${result1 === result2 ? "✓" : "✗"}\n`);
  });
}

// 테스트케이스 실행
console.log("=== 기본 테스트 ===");
console.log("테스트케이스 1:", solution(m, n, puddles)); // 예상: 4
console.log("테스트케이스 2:", solution(3, 3, [])); // 예상: 6
console.log(
  "테스트케이스 3:",
  solution(2, 2, [
    [2, 1],
    [1, 2],
  ])
); // 예상: 0

console.log("\n");
performanceTest();
