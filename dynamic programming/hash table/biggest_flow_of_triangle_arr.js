// https://school.programmers.co.kr/learn/courses/30/lessons/43105

// 문제 설명

// 위와 같은 삼각형의 꼭대기에서 바닥까지 이어지는 경로 중, 거쳐간 숫자의 합이 가장 큰 경우를 찾아보려고 합니다.
// 아래 칸으로 이동할 때는 대각선 방향으로 한 칸 오른쪽 또는 왼쪽으로만 이동 가능합니다.

// 삼각형의 정보가 담긴 배열 triangle이 매개변수로 주어질 때, 거쳐간 숫자의 최댓값을 return 하도록 solution 함수를 완성하세요.

// 제한사항
// 삼각형의 높이는 1 이상 500 이하입니다.
// 삼각형을 이루고 있는 숫자는 0 이상 9,999 이하의 정수입니다.

let triangle1 = [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]; //30

// 큰 테스트 케이스 생성 함수
function generateLargeTriangle(size) {
  const triangle = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j <= i; j++) {
      row.push(Math.floor(Math.random() * 100) + 1);
    }
    triangle.push(row);
  }
  return triangle;
}

// 방법 1: 기존 2D DP 배열 방식
function solutionOriginal(triangle) {
  let dp = Array.from({ length: triangle.length }, (_, i) =>
    Array(triangle[i].length).fill(0)
  );

  dp[0][0] = triangle[0][0];

  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      let leftAbove = dp[i - 1][j - 1] ?? 0;
      let rightAbove = dp[i - 1][j] ?? 0;
      dp[i][j] = triangle[i][j] + Math.max(leftAbove, rightAbove);
    }
  }

  return Math.max(...dp[triangle.length - 1]);
}

// 방법 2: 공간 최적화 버전 (이전 행만 저장)
function solutionOptimized(triangle) {
  let prevRow = [triangle[0][0]];

  for (let i = 1; i < triangle.length; i++) {
    let currentRow = new Array(triangle[i].length);

    for (let j = 0; j < triangle[i].length; j++) {
      let leftAbove = prevRow[j - 1] ?? 0;
      let rightAbove = prevRow[j] ?? 0;
      currentRow[j] = triangle[i][j] + Math.max(leftAbove, rightAbove);
    }

    prevRow = currentRow;
  }

  return Math.max(...prevRow);
}

// 방법 3: In-place 수정 (원본 배열 수정)
function solutionInPlace(triangle) {
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      let leftAbove = triangle[i - 1][j - 1] ?? 0;
      let rightAbove = triangle[i - 1][j] ?? 0;
      triangle[i][j] += Math.max(leftAbove, rightAbove);
    }
  }

  return Math.max(...triangle[triangle.length - 1]);
}

// 성능 테스트 함수
function performanceTest(size, iterations = 100) {
  console.log(
    `\n=== 성능 테스트 (삼각형 크기: ${size}, 반복: ${iterations}회) ===`
  );

  // 동일한 테스트 케이스 생성 (모든 방법에서 같은 데이터 사용)
  const testCases = [];
  for (let i = 0; i < iterations; i++) {
    testCases.push(generateLargeTriangle(size));
  }

  // 테스트 결과 저장
  const results = [];

  // 방법 1: 기존 2D DP
  let totalTime1 = 0;
  for (let i = 0; i < iterations; i++) {
    const testTriangle = JSON.parse(JSON.stringify(testCases[i])); // 깊은 복사
    const start = performance.now();
    const result = solutionOriginal(testTriangle);
    const end = performance.now();
    totalTime1 += end - start;
    if (i === 0) results.push(result);
  }

  // 방법 2: 공간 최적화
  let totalTime2 = 0;
  for (let i = 0; i < iterations; i++) {
    const testTriangle = JSON.parse(JSON.stringify(testCases[i])); // 깊은 복사
    const start = performance.now();
    const result = solutionOptimized(testTriangle);
    const end = performance.now();
    totalTime2 += end - start;
    if (i === 0) results.push(result);
  }

  // 방법 3: In-place 수정
  let totalTime3 = 0;
  for (let i = 0; i < iterations; i++) {
    const testTriangle = JSON.parse(JSON.stringify(testCases[i])); // 깊은 복사
    const start = performance.now();
    const result = solutionInPlace(testTriangle);
    const end = performance.now();
    totalTime3 += end - start;
    if (i === 0) results.push(result);
  }

  // 결과 출력
  const avgTime1 = totalTime1 / iterations;
  const avgTime2 = totalTime2 / iterations;
  const avgTime3 = totalTime3 / iterations;

  console.log(`기존 2D DP 방식:     ${avgTime1.toFixed(3)}ms (평균)`);
  console.log(`공간 최적화 방식:    ${avgTime2.toFixed(3)}ms (평균)`);
  console.log(`In-place 수정 방식:  ${avgTime3.toFixed(3)}ms (평균)`);

  console.log(`\n성능 개선:`);
  console.log(
    `공간 최적화 vs 기존: ${(((avgTime1 - avgTime2) / avgTime1) * 100).toFixed(
      1
    )}% 빠름`
  );
  console.log(
    `In-place vs 기존:   ${(((avgTime1 - avgTime3) / avgTime1) * 100).toFixed(
      1
    )}% 빠름`
  );
  console.log(
    `In-place vs 공간최적화: ${(
      ((avgTime2 - avgTime3) / avgTime2) *
      100
    ).toFixed(1)}% 빠름`
  );

  // 결과 검증
  if (results[0] === results[1] && results[1] === results[2]) {
    console.log(`✅ 모든 방법이 동일한 결과 반환: ${results[0]}`);
  } else {
    console.log(`❌ 결과 불일치: ${results.join(", ")}`);
  }
}

// 기본 테스트
console.log("=== 기본 테스트 ===");
console.log(`기존 방식: ${solutionOriginal([...triangle1])}`);
console.log(`공간 최적화: ${solutionOptimized([...triangle1])}`);
console.log(`In-place: ${solutionInPlace([...triangle1])}`);

// 다양한 크기로 성능 테스트
performanceTest(50, 100); // 작은 크기
performanceTest(100, 50); // 중간 크기
performanceTest(200, 20); // 큰 크기
