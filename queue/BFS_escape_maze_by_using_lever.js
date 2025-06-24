// https://school.programmers.co.kr/learn/courses/30/lessons/159993
let maps1 = ["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]; // 16
let maps2 = ["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]; // -1

function solution(maps) {
  const row = maps.length;
  const col = maps[0].length;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  let start = [0, 0];
  let lever = [0, 0];
  let exit = [0, 0];

  // S, L, E 위치 찾기
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (maps[i][j] === "S") {
        start = [i, j];
      } else if (maps[i][j] === "L") {
        lever = [i, j];
      } else if (maps[i][j] === "E") {
        exit = [i, j];
      }
    }
  }

  // BFS 함수
  const BFS = (startPos, targetPos) => {
    const visited = Array.from({ length: row }, () => Array(col).fill(false));
    const queue = [[startPos[0], startPos[1], 0]];
    visited[startPos[0]][startPos[1]] = true;

    while (queue.length > 0) {
      const [currentY, currentX, count] = queue.shift();

      // 목표 지점에 도달했는지 확인
      if (currentY === targetPos[0] && currentX === targetPos[1]) {
        return count;
      }

      // 4방향 탐색
      for (let i = 0; i < 4; i++) {
        const nextY = currentY + dy[i];
        const nextX = currentX + dx[i];

        // 경계 체크 및 방문 가능 여부 확인
        if (
          nextY >= 0 &&
          nextY < row &&
          nextX >= 0 &&
          nextX < col &&
          !visited[nextY][nextX] &&
          maps[nextY][nextX] !== "X"
        ) {
          visited[nextY][nextX] = true;
          queue.push([nextY, nextX, count + 1]);
        }
      }
    }

    return -1; // 목표 지점에 도달할 수 없는 경우
  };

  // 1단계: 시작점에서 레버까지의 거리
  const distanceToLever = BFS(start, lever);
  if (distanceToLever === -1) {
    return -1;
  }

  // 2단계: 레버에서 출구까지의 거리
  const distanceToExit = BFS(lever, exit);
  if (distanceToExit === -1) {
    return -1;
  }

  return distanceToLever + distanceToExit;
}

console.log(solution(maps1)); // 16
console.log(solution(maps2)); // -1
