// https://school.programmers.co.kr/learn/courses/30/lessons/12905

let board1 = [
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
]; //	9

let board2 = [
  [0, 0, 1, 1],
  [1, 1, 1, 1],
]; // 4

function solution(board) {
  const row = board.length;
  const col = board[0].length;
  const dp = Array.from({ length: row }, () => Array(col).fill(0));
  let maxSize = 0;

  // 첫 번째 행과 열을 초기화
  for (let i = 0; i < row; i++) {
    dp[i][0] = board[i][0];
    maxSize = Math.max(maxSize, dp[i][0]);
  }
  for (let j = 0; j < col; j++) {
    dp[0][j] = board[0][j];
    maxSize = Math.max(maxSize, dp[0][j]);
  }

  // 나머지 칸들에 대해 DP 적용
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (board[i][j] === 1) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        // 위, 왼쪽, 왼쪽 위 중 가장 작은 값 + 1 => 우하단에 가장 작은 값이 중첩됨
        maxSize = Math.max(maxSize, dp[i][j]);
      }
    }
  }

  return maxSize * maxSize;
}

console.log(solution(board1));
console.log(solution(board2));
