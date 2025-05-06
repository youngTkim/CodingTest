/// https://school.programmers.co.kr/learn/courses/30/lessons/17679

let m = 4,
  n = 5,
  board = ["CCBDE", "AAADE", "AAABF", "CCBBF"];

function solution(m, n, board) {
  // 문자열 배열을 2차원 배열로 변환
  let game_board = board.map((row) => row.split(""));
  let answer = 0;
  let hasMatch = true;

  // 더 이상 2x2 블록이 없을 때까지 반복
  while (hasMatch) {
    // 제거할 블록 표시를 위한 배열
    const remove_board = Array.from({ length: m }, () => Array(n).fill(false));
    hasMatch = false;

    // 2x2 블록 검사
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        const block = game_board[i][j];
        // 빈 공간이면 무시
        if (block === "0") continue;

        // 2x2 형태인지 확인
        if (
          block === game_board[i][j + 1] &&
          block === game_board[i + 1][j] &&
          block === game_board[i + 1][j + 1]
        ) {
          remove_board[i][j] = true;
          remove_board[i][j + 1] = true;
          remove_board[i + 1][j] = true;
          remove_board[i + 1][j + 1] = true;
          hasMatch = true;
        }
      }
    }

    // 블록 제거 및 카운트
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (remove_board[i][j]) {
          game_board[i][j] = "0";
          answer++;
        }
      }
    }

    // 블록 아래로 떨어뜨리기
    for (let j = 0; j < n; j++) {
      for (let i = m - 1; i > 0; i--) {
        if (game_board[i][j] === "0") {
          // 현재 위치가 빈 공간이면 위에서 블록 찾기
          for (let k = i - 1; k >= 0; k--) {
            if (game_board[k][j] !== "0") {
              game_board[i][j] = game_board[k][j];
              game_board[k][j] = "0";
              break;
            }
          }
        }
      }
    }
  }

  return answer;
}

console.log(solution(m, n, board)); // 14
