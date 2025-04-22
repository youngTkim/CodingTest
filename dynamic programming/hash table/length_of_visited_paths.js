// https://school.programmers.co.kr/learn/courses/30/lessons/49994

function solution(dirs) {
  let current = [0, 0];
  let visited = new Set();
  for (let i = 0; i < dirs.length; i++) {
    let [x, y] = current;
    let [nx, ny] = [x, y];
    if (dirs[i] === "U") ny += 1;
    if (dirs[i] === "D") ny -= 1;
    if (dirs[i] === "R") nx += 1;
    if (dirs[i] === "L") nx -= 1;
    if (nx < -5 || nx > 5 || ny < -5 || ny > 5) continue;
    visited.add(`${x},${y},${nx},${ny}`);
    visited.add(`${nx},${ny},${x},${y}`);
    current = [nx, ny];
  }
  return visited.size / 2;
}
