// https://school.programmers.co.kr/learn/courses/30/lessons/154538

/**
 * 자연수 x를 y로 변환하는 최소 연산 횟수 구하기
 * 연산: +n, ×2, ×3
 * @param {number} x - 시작 값
 * @param {number} y - 목표 값
 * @param {number} n - 더할 수 있는 값
 * @returns {number} 최소 연산 횟수 (불가능하면 -1)
 */
function solution(x, y, n) {
  // 이미 목표값에 도달한 경우
  if (x === y) return 0;

  // BFS를 위한 큐와 방문 체크 배열
  const queue = [[x, 0]]; // [현재값, 연산횟수]
  const visited = new Set([x]);

  while (queue.length > 0) {
    const [current, operations] = queue.shift();

    // 가능한 세 가지 연산 수행
    const nextValues = [
      current + n, // +n 연산
      current * 2, // ×2 연산
      current * 3, // ×3 연산
    ];

    for (const nextValue of nextValues) {
      // 목표값에 도달한 경우
      if (nextValue === y) {
        return operations + 1;
      }

      // 목표값을 넘어서거나 이미 방문한 경우 스킵
      if (nextValue > y || visited.has(nextValue)) {
        continue;
      }

      // 방문 체크 후 큐에 추가
      visited.add(nextValue);
      queue.push([nextValue, operations + 1]);
    }
  }

  // 목표값에 도달할 수 없는 경우
  return -1;
}

/**
 * 테스트 케이스들
 */
const testCases = [
  { x: 10, y: 40, n: 5, expected: 2, description: "10 → 40 (×2 → ×2)" },
  { x: 10, y: 40, n: 30, expected: 1, description: "10 → 40 (+30)" },
  { x: 2, y: 5, n: 4, expected: -1, description: "2 → 5 (불가능)" },
  { x: 1, y: 1, n: 1, expected: 0, description: "1 → 1 (이미 같음)" },
  { x: 1, y: 8, n: 1, expected: 3, description: "1 → 8 (×2 → ×2 → ×2)" },
  { x: 2, y: 11, n: 1, expected: 3, description: "2 → 11 (+1 → ×3 → +1)" },
];

/**
 * 상세 경로 추적을 위한 BFS (디버깅용)
 */
function solutionWithPath(x, y, n) {
  if (x === y) return { operations: 0, path: [x] };

  const queue = [[x, 0, [x]]];
  const visited = new Set([x]);

  while (queue.length > 0) {
    const [current, operations, path] = queue.shift();

    const nextOperations = [
      { value: current + n, op: `+${n}` },
      { value: current * 2, op: `×2` },
      { value: current * 3, op: `×3` },
    ];

    for (const { value: nextValue, op } of nextOperations) {
      if (nextValue === y) {
        return {
          operations: operations + 1,
          path: [...path, nextValue],
          operationPath: [
            ...path
              .slice(1)
              .map((val, i) => (i === 0 ? `${path[0]}` : `${op}`)),
            op,
          ],
        };
      }

      if (nextValue > y || visited.has(nextValue)) {
        continue;
      }

      visited.add(nextValue);
      queue.push([nextValue, operations + 1, [...path, nextValue]]);
    }
  }

  return { operations: -1, path: [] };
}

/**
 * 테스트 실행 함수
 */
const runTests = () => {
  console.log("=== 자연수 변환 테스트 ===\n");

  testCases.forEach(({ x, y, n, expected, description }, index) => {
    console.log(`Test ${index + 1}: ${description}`);
    console.log(`입력: x=${x}, y=${y}, n=${n}`);

    const result = solution(x, y, n);
    const isCorrect = result === expected;

    console.log(`결과: ${result}번 연산`);
    console.log(`예상: ${expected}번 연산`);
    console.log(`상태: ${isCorrect ? "✅ 통과" : "❌ 실패"}`);

    // 성공한 경우 경로 표시
    if (result !== -1 && result <= 5) {
      const pathResult = solutionWithPath(x, y, n);
      if (pathResult.operations !== -1) {
        console.log(`경로: ${pathResult.path.join(" → ")}`);
      }
    }

    console.log("---");
  });

  console.log("=== 테스트 완료 ===");
};

// 테스트 실행
runTests();
