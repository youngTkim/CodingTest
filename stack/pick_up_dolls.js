//https://school.programmers.co.kr/learn/courses/30/lessons/64061

let board1 = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];

let moves1 = [1, 5, 3, 5, 1, 2, 1, 4];

function solution(board, moves) {
  let stack = [];
  let answer = 0;
  for (let i = 0; i < moves.length; i++) {
    let move = moves[i];
    for (let j = 0; j < board.length; j++) {
      if (board[j][move - 1] !== 0) {
        const LastDoll = stack.at(-1);
        const CurrentDoll = board[j][move - 1];
        if (LastDoll === CurrentDoll) {
          stack.pop();
          answer += 2;
        } else {
          stack.push(CurrentDoll);
        }

        board[j][move - 1] = 0;
        break;
      }
    }
  }

  return answer;
}

console.log(solution(board1, moves1));
