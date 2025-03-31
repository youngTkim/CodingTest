// https://school.programmers.co.kr/learn/courses/30/lessons/1844

let maps = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
];

function solution(maps) {
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let queue = [];
  queue.push([0, 0]);

  while (queue.length > 0) {
    let [x, y] = queue.shift();
    console.log(maps);

    for (let i = 0; i < directions.length; i++) {
      let [dx, dy] = directions[i];
      let nx = x + dx;
      let ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < maps.length && ny < maps[0].length) {
        if (maps[nx][ny] === 0) {
          continue;
        }

        if (maps[nx][ny] === 1) {
          maps[nx][ny] = maps[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  return maps[maps.length - 1][maps[0].length - 1];
}

console.log(solution(maps));
