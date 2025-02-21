// https://school.programmers.co.kr/learn/courses/30/lessons/49189

let n = 6,
  edge = [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ];

function solution(n, edge) {
  const connects = new Array(n).fill().map((_) => []);
  for (const e of edge) {
    connects[e[0] - 1].push(e[1] - 1);
    connects[e[1] - 1].push(e[0] - 1);
  }
  let depths = [1];
  let queue = [0];
  while (queue.length) {
    let cur = queue.shift();
    for (let next of connects[cur]) {
      if (!depths[next]) {
        depths[next] = depths[cur] + 1;
        queue.push(next);
      }
    }
  }
  const max = Math.max(...depths);
  return depths.filter((depth) => depth === max).length;
}

let answer = solution(n, edge);
console.log(answer);
