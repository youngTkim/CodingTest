// https://school.programmers.co.kr/learn/courses/30/lessons/250136

// 문제 설명
// [본 문제는 정확성과 효율성 테스트 각각 점수가 있는 문제입니다.]

// 세로길이가 n 가로길이가 m인 격자 모양의 땅 속에서 석유가 발견되었습니다.
// 석유는 여러 덩어리로 나누어 묻혀있습니다. 당신이 시추관을 수직으로 단 하나만 뚫을 수 있을 때, 가장 많은 석유를 뽑을 수 있는 시추관의 위치를 찾으려고 합니다.
// 시추관은 열 하나를 관통하는 형태여야 하며, 열과 열 사이에 시추관을 뚫을 수 없습니다.

// 예를 들어 가로가 8, 세로가 5인 격자 모양의 땅 속에 위 그림처럼 석유가 발견되었다고 가정하겠습니다. 상, 하, 좌, 우로 연결된 석유는 하나의 덩어리이며,
// 석유 덩어리의 크기는 덩어리에 포함된 칸의 수입니다. 그림에서 석유 덩어리의 크기는 왼쪽부터 8, 7, 2입니다.

// 시추관은 위 그림처럼 설치한 위치 아래로 끝까지 뻗어나갑니다. 만약 시추관이 석유 덩어리의 일부를 지나면 해당 덩어리에 속한 모든 석유를 뽑을 수 있습니다.
// 시추관이 뽑을 수 있는 석유량은 시추관이 지나는 석유 덩어리들의 크기를 모두 합한 값입니다. 시추관을 설치한 위치에 따라 뽑을 수 있는 석유량은 다음과 같습니다.

// 예시

// 시추관의 위치	획득한 덩어리	총 석유량
// 1	[8]	8
// 2	[8]	8
// 3	[8]	8
// 4	[7]	7
// 5	[7]	7
// 6	[7]	7
// 7	[7, 2]	9
// 8	[2]	2
// 오른쪽 그림처럼 7번 열에 시추관을 설치하면 크기가 7, 2인 덩어리의 석유를 얻어 뽑을 수 있는 석유량이 9로 가장 많습니다.

// 석유가 묻힌 땅과 석유 덩어리를 나타내는 2차원 정수 배열 land가 매개변수로 주어집니다. 이때 시추관 하나를 설치해 뽑을 수 있는 가장 많은 석유량을 return 하도록 solution 함수를 완성해 주세요.

// 제한사항
// 1 ≤ land의 길이 = 땅의 세로길이 = n ≤ 500
// 1 ≤ land[i]의 길이 = 땅의 가로길이 = m ≤ 500
// land[i][j]는 i+1행 j+1열 땅의 정보를 나타냅니다.
// land[i][j]는 0 또는 1입니다.
// land[i][j]가 0이면 빈 땅을, 1이면 석유가 있는 땅을 의미합니다.
// 정확성 테스트 케이스 제한사항
// 1 ≤ land의 길이 = 땅의 세로길이 = n ≤ 100
// 1 ≤ land[i]의 길이 = 땅의 가로길이 = m ≤ 100
// 효율성 테스트 케이스 제한사항
// 주어진 조건 외 추가 제한사항 없습니다.

const solution = (land) => {
  const rows = land.length;
  const cols = land[0].length;
  const visited = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );
  const oil_groups = new Map(); // 석유 덩어리 ID와 크기 매핑
  const oil_map = Array.from({ length: rows }, () => new Array(cols).fill(-1)); // 각 위치의 석유 덩어리 ID
  let group_id = 0;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const BFS_FindOilGroup = (start_row, start_col) => {
    const queue = [[start_row, start_col]];
    visited[start_row][start_col] = true;
    oil_map[start_row][start_col] = group_id;
    let count = 1;

    while (queue.length > 0) {
      const [row, col] = queue.shift();

      for (const [dr, dc] of directions) {
        const new_row = row + dr;
        const new_col = col + dc;

        // 범위 체크
        if (new_row < 0 || new_row >= rows || new_col < 0 || new_col >= cols)
          continue;

        // 석유가 있고 방문하지 않은 경우
        if (land[new_row][new_col] === 1 && !visited[new_row][new_col]) {
          visited[new_row][new_col] = true;
          oil_map[new_row][new_col] = group_id;
          queue.push([new_row, new_col]);
          count++;
        }
      }
    }

    return count;
  };

  // 1. 모든 석유 덩어리 찾기
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] === 1 && !visited[row][col]) {
        const group_size = BFS_FindOilGroup(row, col);
        oil_groups.set(group_id, group_size);
        group_id++;
      }
    }
  }

  // 2. 각 열에서 시추할 수 있는 석유량 계산
  let max_oil = 0;

  for (let col = 0; col < cols; col++) {
    const unique_groups = new Set();
    let total_oil = 0;

    // 해당 열의 모든 행을 확인
    for (let row = 0; row < rows; row++) {
      if (land[row][col] === 1) {
        const group_id = oil_map[row][col];
        if (!unique_groups.has(group_id)) {
          unique_groups.add(group_id);
          total_oil += oil_groups.get(group_id);
        }
      }
    }

    max_oil = Math.max(max_oil, total_oil);
  }

  return max_oil;
};

// 테스트 케이스
const testCases = [
  {
    input: [
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 1],
    ],
    expected: 9,
  },
  {
    input: [
      [1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0],
      [1, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
    ],
    expected: 16,
  },
];

// 테스트 실행
testCases.forEach((testCase, index) => {
  const result = solution(testCase.input);
  const isCorrect = result === testCase.expected;
  console.log(`테스트 ${index + 1}:`, isCorrect ? "✅ 통과" : "❌ 실패");
  console.log(`입력:`, testCase.input);
  console.log(`예상: ${testCase.expected}, 결과: ${result}`);
  console.log("---");
});
