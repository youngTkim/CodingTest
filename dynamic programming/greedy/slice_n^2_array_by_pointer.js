// https://school.programmers.co.kr/learn/courses/30/lessons/87390
let n1 = 3;
let left1 = 2;
let right1 = 5;

let n2 = 4;
let left2 = 7;
let right2 = 14;

const solution = (n, left, right) => {
  const resultLength = right - left + 1; // slice될 배열의 길이
  const result = new Array(resultLength);

  for (let i = 0; i < resultLength; i++) {
    const currentIndex = left + i;
    // 현재 y좌표
    const row = Math.floor(currentIndex / n);
    // 현재 x좌표
    const col = currentIndex % n;
    const value = Math.max(row, col) + 1;

    result[i] = value;
  }

  return result;
};

/**
 * 성능 비교를 위한 기존 방식 (참고용)
 */
const solutionOld = (n, left, right) => {
  const arr = new Array(n)
    .fill(0)
    .map((_, i) => new Array(n).fill(0).map((_, j) => Math.max(i, j) + 1));

  return arr.flat().slice(left, right + 1);
};

/**
 * 테스트 실행 및 성능 비교
 */
const runPerformanceTest = () => {
  console.log("=== n^2 배열 자르기 성능 테스트 ===\n");

  const testCases = [
    { n: n1, left: left1, right: right1, name: "Test Case 1" },
    { n: n2, left: left2, right: right2, name: "Test Case 2" },
    { n: 10000, left: 5000, right: 5010, name: "Large Test Case" },
  ];

  testCases.forEach(({ n, left, right, name }) => {
    console.log(`${name}: n=${n}, left=${left}, right=${right}`);

    // 최적화된 방식 성능 측정
    const startTimeOptimized = performance.now();
    const resultOptimized = solution(n, left, right);
    const endTimeOptimized = performance.now();

    console.log(
      `✅ 최적화된 방식: ${(endTimeOptimized - startTimeOptimized).toFixed(
        4
      )}ms`
    );
    console.log(
      `결과: [${resultOptimized.slice(0, 5).join(", ")}${
        resultOptimized.length > 5 ? ", ..." : ""
      }]`
    );

    // 작은 테스트 케이스에서만 기존 방식 비교
    if (n <= 1000) {
      const startTimeOld = performance.now();
      const resultOld = solutionOld(n, left, right);
      const endTimeOld = performance.now();

      console.log(`❌ 기존 방식: ${(endTimeOld - startTimeOld).toFixed(4)}ms`);
      console.log(
        `결과 일치: ${
          JSON.stringify(resultOptimized) === JSON.stringify(resultOld)
            ? "✅"
            : "❌"
        }`
      );
    } else {
      console.log(`❌ 기존 방식: 큰 입력에서는 측정 생략 (메모리 부족 위험)`);
    }

    console.log(`배열 길이: ${resultOptimized.length}`);
    console.log("---");
  });

  console.log("=== 테스트 완료 ===");
};

// 개별 테스트 케이스 실행
console.log("개별 테스트 결과:");
console.log(`Case 1: [${solution(n1, left1, right1).join(", ")}]`);
console.log(`Case 2: [${solution(n2, left2, right2).join(", ")}]`);
console.log();

// 성능 테스트 실행
runPerformanceTest();
