// https://school.programmers.co.kr/learn/courses/30/lessons/169199
let board1 = ["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."]; //7
let board2 = [".D.R", "....", ".G..", "...D"]; //-1

function solution(board) {
  const n = board.length;
  const m = board[0].length;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  let startPoint = [0, 0];
  let goalPoint = [0, 0];

  // R과 G의 위치 찾기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === "R") {
        startPoint = [i, j];
      }
      if (board[i][j] === "G") {
        goalPoint = [i, j];
      }
    }
  }

  const BFS = (startX, startY) => {
    const queue = [[startX, startY, 0]];
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    visited[startX][startY] = true;

    while (queue.length > 0) {
      const [x, y, count] = queue.shift();

      // 목표 지점에 도달했는지 확인
      if (x === goalPoint[0] && y === goalPoint[1]) {
        return count;
      }

      // 4방향으로 이동 시도
      for (let i = 0; i < 4; i++) {
        let nx = x;
        let ny = y;

        // 장애물이나 벽에 부딪힐 때까지 미끄러져 이동
        while (true) {
          const nextX = nx + dx[i];
          const nextY = ny + dy[i];

          // 경계를 벗어나거나 장애물에 부딪히면 멈춤
          if (
            nextX < 0 ||
            nextX >= n ||
            nextY < 0 ||
            nextY >= m ||
            board[nextX][nextY] === "D"
          ) {
            break;
          }

          nx = nextX;
          ny = nextY;
        }

        // 방문하지 않은 위치이고, 시작 위치와 다른 경우에만 큐에 추가
        if (!visited[nx][ny] && (nx !== x || ny !== y)) {
          visited[nx][ny] = true;
          queue.push([nx, ny, count + 1]);
        }
      }
    }

    return -1; // 목표 지점에 도달할 수 없는 경우
  };

  return BFS(startPoint[0], startPoint[1]);
}

console.log(solution(board1)); // 7
console.log(solution(board2)); // -1
