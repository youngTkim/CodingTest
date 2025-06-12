// https://school.programmers.co.kr/learn/courses/30/lessons/12949

let arr1 = [
  [1, 4],
  [3, 2],
  [4, 1],
];
let arr2 = [
  [3, 3],
  [3, 3],
];
let answer1 = [
  [15, 15],
  [15, 15],
  [15, 15],
];

let arr3 = [
  [2, 3, 2],
  [4, 2, 4],
  [3, 1, 4],
];
let arr4 = [
  [5, 4, 3],
  [2, 4, 1],
  [3, 1, 1],
];
let answer2 = [
  [22, 22, 11],
  [36, 28, 18],
  [29, 20, 14],
];

/**
 * 행렬 곱셈 함수
 * A(m×n) × B(n×p) = C(m×p)
 * @param {number[][]} arr1 - 첫 번째 행렬 A
 * @param {number[][]} arr2 - 두 번째 행렬 B
 * @returns {number[][]} - 결과 행렬 C
 */
function solution(arr1, arr2) {
  const m = arr1.length; // A의 행 개수
  const n = arr1[0].length; // A의 열 개수 = B의 행 개수
  const p = arr2[0].length; // B의 열 개수

  // 결과 행렬 C(m×p) 초기화
  const result = Array.from({ length: m }, () => Array(p).fill(0));

  // 행렬 곱셈 계산
  for (let i = 0; i < m; i++) {
    // A의 각 행
    for (let j = 0; j < p; j++) {
      // B의 각 열
      for (let k = 0; k < n; k++) {
        // 내적 계산
        result[i][j] += arr1[i][k] * arr2[k][j];
      }
    }
  }

  return result;
}

/**
 * 행렬 곱셈 검증 함수
 */
const validateMatrixMultiplication = (arr1, arr2) => {
  const m = arr1.length;
  const n = arr1[0].length;
  const p = arr2[0].length;
  const bRows = arr2.length;

  if (n !== bRows) {
    throw new Error(`행렬 곱셈 불가능: A의 열(${n}) ≠ B의 행(${bRows})`);
  }

  console.log(
    `✅ 행렬 곱셈 가능: A(${m}×${n}) × B(${bRows}×${p}) = C(${m}×${p})`
  );
};

/**
 * 결과 비교 및 출력 함수
 */
const testMatrixMultiplication = (arr1, arr2, expected, testName) => {
  console.log(`\n=== ${testName} ===`);

  try {
    validateMatrixMultiplication(arr1, arr2);

    const result = solution(arr1, arr2);
    const isCorrect = JSON.stringify(result) === JSON.stringify(expected);

    console.log("📊 결과:");
    result.forEach((row, i) => {
      console.log(`  [${row.join(", ")}]`);
    });

    console.log("🎯 예상:");
    expected.forEach((row, i) => {
      console.log(`  [${row.join(", ")}]`);
    });

    console.log(`\n${isCorrect ? "✅ 통과" : "❌ 실패"}`);

    // 단계별 계산 과정 보여주기
    if (arr1.length <= 3 && arr2[0].length <= 3) {
      console.log("\n🔍 계산 과정:");
      showCalculationSteps(arr1, arr2, result);
    }
  } catch (error) {
    console.error(`❌ ${error.message}`);
  }
};

/**
 * 행렬 곱셈 계산 과정 시각화
 */
const showCalculationSteps = (arr1, arr2, result) => {
  const m = arr1.length;
  const p = arr2[0].length;
  const n = arr1[0].length;

  for (let i = 0; i < Math.min(m, 2); i++) {
    for (let j = 0; j < Math.min(p, 2); j++) {
      let calculation = `C[${i}][${j}] = `;
      let steps = [];

      for (let k = 0; k < n; k++) {
        steps.push(`${arr1[i][k]}×${arr2[k][j]}`);
      }

      calculation += steps.join(" + ");
      calculation += ` = ${result[i][j]}`;
      console.log(`  ${calculation}`);
    }
  }
};

// 테스트 실행
testMatrixMultiplication(arr1, arr2, answer1, "Test Case 1");
testMatrixMultiplication(arr3, arr4, answer2, "Test Case 2");
