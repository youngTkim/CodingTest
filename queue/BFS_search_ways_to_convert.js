/**
 * 자연수 x를 y로 변환하는 최소 연산 횟수 구하기 (최적화된 역방향 BFS)
 * 연산: +n, ×2, ×3
 * @param {number} x - 시작 값
 * @param {number} y - 목표 값
 * @param {number} n - 더할 수 있는 값
 * @returns {number} 최소 연산 횟수 (불가능하면 -1)
 */
function solution(x, y, n) {
  // 이미 목표값에 도달한 경우
  if (x === y) return 0;

  // 역방향 BFS: y에서 x로 가는 방법을 찾음
  const queue = [[y, 0]]; // [현재값, 연산횟수]
  const visited = new Set([y]);

  while (queue.length > 0) {
    const [current, operations] = queue.shift();

    // 목표값에 도달한 경우
    if (current === x) {
      return operations;
    }

    // x보다 작아지면 더 이상 진행 불가
    if (current < x) {
      continue;
    }

    // 가능한 역방향 연산들
    const nextValues = [];

    // 1. current - n (+ n의 역연산)
    if (current - n >= x) {
      nextValues.push(current - n);
    }

    // 2. current / 2 (× 2의 역연산, 짝수일 때만 가능)
    if (current % 2 === 0) {
      nextValues.push(current / 2);
    }

    // 3. current / 3 (× 3의 역연산, 3의 배수일 때만 가능)
    if (current % 3 === 0) {
      nextValues.push(current / 3);
    }

    // 다음 값들을 큐에 추가
    for (const nextValue of nextValues) {
      if (!visited.has(nextValue)) {
        visited.add(nextValue);
        queue.push([nextValue, operations + 1]);
      }
    }
  }

  // 목표값에 도달할 수 없는 경우
  return -1;
}

/**
 * 성능 비교를 위한 정방향 BFS (기존 방식)
 */
function solutionForward(x, y, n) {
  if (x === y) return 0;

  const queue = [[x, 0]];
  const visited = new Set([x]);

  while (queue.length > 0) {
    const [current, operations] = queue.shift();

    const nextValues = [current + n, current * 2, current * 3];

    for (const nextValue of nextValues) {
      if (nextValue === y) {
        return operations + 1;
      }

      if (nextValue > y || visited.has(nextValue)) {
        continue;
      }

      visited.add(nextValue);
      queue.push([nextValue, operations + 1]);
    }
  }

  return -1;
}

/**
 * 테스트 케이스들
 */
const testCases = [
  { x: 10, y: 40, n: 5, expected: 2, description: "기본 케이스" },
  { x: 10, y: 40, n: 30, expected: 1, description: "한 번에 도달" },
  { x: 2, y: 5, n: 4, expected: -1, description: "불가능한 케이스" },
  { x: 1, y: 1, n: 1, expected: 0, description: "이미 같음" },
  { x: 1, y: 8, n: 1, expected: 3, description: "작은 값들" },
  { x: 1, y: 1000000, n: 1, expected: 19, description: "큰 값 테스트" },
  { x: 100, y: 999999, n: 1, expected: 17, description: "시간 초과 테스트" },
];

/**
 * 성능 테스트 실행
 */
const runPerformanceTest = () => {
  console.log("=== 성능 최적화 테스트 ===\n");

  testCases.forEach(({ x, y, n, expected, description }, index) => {
    console.log(`Test ${index + 1}: ${description}`);
    console.log(`입력: x=${x}, y=${y}, n=${n}`);

    // 역방향 BFS 성능 측정
    const startTimeReverse = performance.now();
    const resultReverse = solution(x, y, n);
    const endTimeReverse = performance.now();

    console.log(
      `✅ 역방향 BFS: ${resultReverse}번 연산 (${(
        endTimeReverse - startTimeReverse
      ).toFixed(4)}ms)`
    );

    // 작은 케이스에서만 정방향 BFS 비교
    if (y <= 10000) {
      const startTimeForward = performance.now();
      const resultForward = solutionForward(x, y, n);
      const endTimeForward = performance.now();

      console.log(
        `❌ 정방향 BFS: ${resultForward}번 연산 (${(
          endTimeForward - startTimeForward
        ).toFixed(4)}ms)`
      );
      console.log(
        `결과 일치: ${resultReverse === resultForward ? "✅" : "❌"}`
      );
    } else {
      console.log(`❌ 정방향 BFS: 큰 입력에서는 측정 생략 (시간 초과 위험)`);
    }

    const isCorrect = expected === null || resultReverse === expected;
    console.log(`예상: ${expected ?? "미정"}번 연산`);
    console.log(`상태: ${isCorrect ? "✅ 통과" : "❌ 실패"}`);

    console.log("---");
  });

  console.log("=== 테스트 완료 ===");
};

// 성능 테스트 실행
runPerformanceTest();
