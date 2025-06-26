// https://school.programmers.co.kr/learn/courses/30/lessons/77485
let rows1 = 6,
  columns1 = 6,
  queries1 = [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ]; // [8, 10, 25]
let rows2 = 3,
  columns2 = 3,
  queries2 = [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ]; // [1, 1, 5, 3]
let rows3 = 100,
  columns3 = 97,
  queries3 = [[1, 1, 100, 97]]; // [1]

function solution(rows, columns, queries) {
  // 행렬 초기화: 1부터 rows*columns까지 순서대로 채움
  let board = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) => i * columns + j + 1)
  );

  const answer = [];

  const rotate = (x1, y1, x2, y2) => {
    // 테두리의 모든 값들을 저장할 배열
    const borderValues = [];

    // 윗변: 왼쪽에서 오른쪽으로 (y1, x1) → (y1, x2)
    for (let col = x1; col <= x2; col++) {
      borderValues.push(board[y1][col]);
    }

    // 오른변: 위에서 아래로 (y1+1, x2) → (y2, x2)
    for (let row = y1 + 1; row <= y2; row++) {
      borderValues.push(board[row][x2]);
    }
    // 아랫변: 오른쪽에서 왼쪽으로 (y2, x2-1) → (y2, x1)
    // x2 != x1일 때만 (단일 열이 아닐 때만)
    if (x2 > x1) {
      for (let col = x2 - 1; col >= x1; col--) {
        borderValues.push(board[y2][col]);
      }
    }

    // 왼변: 아래에서 위로 (y2-1, x1) → (y1+1, x1)
    // y2 != y1일 때만 (단일 행이 아닐 때만)
    if (y2 > y1) {
      for (let row = y2 - 1; row > y1; row--) {
        borderValues.push(board[row][x1]);
      }
    }

    // 시계방향 회전: 마지막 요소를 첫 번째로 이동
    const rotatedValues = [
      borderValues[borderValues.length - 1],
      ...borderValues.slice(0, -1),
    ];

    // 회전된 값들을 다시 보드에 배치
    let idx = 0;

    // 윗변 배치
    for (let col = x1; col <= x2; col++) {
      board[y1][col] = rotatedValues[idx++];
    }

    // 오른변 배치
    for (let row = y1 + 1; row <= y2; row++) {
      board[row][x2] = rotatedValues[idx++];
    }

    // 아랫변 배치 (단일 열이 아닐 때만)
    if (x2 > x1) {
      for (let col = x2 - 1; col >= x1; col--) {
        board[y2][col] = rotatedValues[idx++];
      }
    }

    // 왼변 배치 (단일 행이 아닐 때만)
    if (y2 > y1) {
      for (let row = y2 - 1; row > y1; row--) {
        board[row][x1] = rotatedValues[idx++];
      }
    }

    // 회전에 의해 이동한 값들 중 최솟값 반환
    return Math.min(...rotatedValues);
  };

  // 각 쿼리에 대해 회전 수행
  for (let query of queries) {
    const minValue = rotate(
      query[1] - 1,
      query[0] - 1,
      query[3] - 1,
      query[2] - 1
    );
    answer.push(minValue);
  }

  return answer;
}

console.log(solution(rows1, columns1, queries1)); // [8, 10, 25]
// console.log(solution(rows2, columns2, queries2)); // [1, 1, 5, 3]
// console.log(solution(rows3, columns3, queries3)); // [1]
