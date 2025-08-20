// https://school.programmers.co.kr/learn/courses/30/lessons/87377

// 문제 설명
// Ax + By + C = 0으로 표현할 수 있는 n개의 직선이 주어질 때, 이 직선의 교점 중 정수 좌표에 별을 그리려 합니다.

// 예를 들어, 다음과 같은 직선 5개를
// 2x - y + 4 = 0
// -2x - y + 4 = 0
// -y + 1 = 0
// 5x - 8y - 12 = 0
// 5x + 8y + 12 = 0
// 좌표 평면 위에 그리면 아래 그림과 같습니다.

// 이때, 모든 교점의 좌표는 (4, 1), (4, -4), (-4, -4), (-4, 1), (0, 4), (1.5, 1.0), (2.1, -0.19), (0, -1.5), (-2.1, -0.19), (-1.5, 1.0)입니다. 이 중 정수로만 표현되는 좌표는 (4, 1), (4, -4), (-4, -4), (-4, 1), (0, 4)입니다.

// 만약 정수로 표현되는 교점에 별을 그리면 다음과 같습니다.

// 위의 그림을 문자열로 나타낼 때, 별이 그려진 부분은 *, 빈 공간(격자선이 교차하는 지점)은 .으로 표현하면 다음과 같습니다.

// "..........."
// ".....*....."
// "..........."
// "..........."
// ".*.......*."
// "..........."
// "..........."
// "..........."
// "..........."
// ".*.......*."
// "..........."
// 이때 격자판은 무한히 넓으니 모든 별을 포함하는 최소한의 크기만 나타내면 됩니다.

// 따라서 정답은
// "....*...."
// "........."
// "........."
// "*.......*"
// "........."
// "........."
// "........."
// "........."
// "*.......*"
// 입니다.

// 직선 A, B, C에 대한 정보가 담긴 배열 line이 매개변수로 주어집니다. 이때 모든 별을 포함하는 최소 사각형을 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// line의 세로(행) 길이는 2 이상 1,000 이하인 자연수입니다.
// line의 가로(열) 길이는 3입니다.
// line의 각 원소는 [A, B, C] 형태입니다.
// A, B, C는 -100,000 이상 100,000 이하인 정수입니다.
// 무수히 많은 교점이 생기는 직선 쌍은 주어지지 않습니다.
// A = 0이면서 B = 0인 경우는 주어지지 않습니다.
// 정답은 1,000 * 1,000 크기 이내에서 표현됩니다.
// 별이 한 개 이상 그려지는 입력만 주어집니다.

const solution = (line) => {
  const intersections = new Set(); // 교점들을 저장할 Set

  // 1. 모든 직선 쌍의 교점 찾기
  for (let i = 0; i < line.length; i++) {
    for (let j = i + 1; j < line.length; j++) {
      const [a1, b1, c1] = line[i];
      const [a2, b2, c2] = line[j];

      // 두 직선의 교점 계산
      // a1*x + b1*y + c1 = 0
      // a2*x + b2*y + c2 = 0
      // 연립방정식 해결

      const denominator = a1 * b2 - a2 * b1;

      // 평행한 직선인 경우 (분모가 0)
      if (denominator === 0) continue;

      const x = (b1 * c2 - b2 * c1) / denominator;
      const y = (a2 * c1 - a1 * c2) / denominator;

      // 정수 좌표인 경우만 저장
      if (Number.isInteger(x) && Number.isInteger(y)) {
        intersections.add(`${x},${y}`);
      }
    }
  }

  // 2. 교점들을 좌표로 변환
  const points = Array.from(intersections).map((point) => {
    const [x, y] = point.split(",").map(Number);
    return [x, y];
  });

  if (points.length === 0) return [];

  // 3. 최소 사각형의 범위 계산
  const xCoords = points.map((p) => p[0]);
  const yCoords = points.map((p) => p[1]);

  const minX = Math.min(...xCoords);
  const maxX = Math.max(...xCoords);
  const minY = Math.min(...yCoords);
  const maxY = Math.max(...yCoords);

  // 4. 격자판 생성
  const rows = maxY - minY + 1;
  const cols = maxX - minX + 1;

  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ".")
  );

  // 5. 교점에 별 그리기
  for (const [x, y] of points) {
    const gridX = x - minX;
    const gridY = maxY - y; // y축은 위에서 아래로 증가하므로 뒤집기
    grid[gridY][gridX] = "*";
  }

  // 6. 문자열 배열로 변환
  return grid.map((row) => row.join(""));
};

// 테스트 케이스
const testCases = [
  {
    input: [
      [2, -1, 4],
      [-2, -1, 4],
      [0, -1, 1],
      [5, -8, -12],
      [5, 8, 12],
    ],
    expected: [
      "....*....",
      ".........",
      ".........",
      "*.......*",
      ".........",
      ".........",
      ".........",
      ".........",
      "*.......*",
    ],
  },
  {
    input: [
      [0, 1, -1],
      [1, 0, -1],
      [1, 0, 1],
    ],
    expected: ["*.*"],
  },
  {
    input: [
      [1, -1, 0],
      [2, -1, 0],
    ],
    expected: ["*"],
  },
  {
    input: [
      [1, -1, 0],
      [2, -1, 0],
      [4, -1, 0],
    ],
    expected: ["*"],
  },
];

// 테스트 실행
testCases.forEach((testCase, index) => {
  const result = solution(testCase.input);
  const isCorrect =
    JSON.stringify(result) === JSON.stringify(testCase.expected);
  console.log(`테스트 ${index + 1}:`, isCorrect ? "✅ 통과" : "❌ 실패");
  console.log(`입력:`, testCase.input);
  console.log(`예상:`, testCase.expected);
  console.log(`결과:`, result);
  console.log("---");
});
