// https://school.programmers.co.kr/learn/courses/30/lessons/12978

let n1 = 5,
  road1 = [
    [1, 2, 1],
    [2, 3, 3],
    [5, 2, 2],
    [1, 4, 2],
    [5, 3, 1],
    [5, 4, 2],
  ],
  k1 = 3; // 4
let n2 = 6,
  road2 = [
    [1, 2, 1],
    [1, 3, 2],
    [2, 3, 2],
    [3, 4, 3],
    [3, 5, 2],
    [3, 5, 3],
    [5, 6, 1],
  ],
  k2 = 4; // 4

function solution(N, road, K) {
  let set = new Set();
  const map = {};
  for (let i = 0; i < road.length; i++) {
    let [a, b, c] = road[i];
    if (!map[a]) map[a] = [];
    if (!map[b]) map[b] = [];
    map[a].push([b, c]);
    map[b].push([a, c]);
  }

  function DFS(start, distance) {
    if (distance > K) return;
    if (distance <= K) set.add(start);
    for (let i = 0; i < map[start].length; i++) {
      let [next, cost] = map[start][i];
      DFS(next, distance + cost);
    }
  }

  DFS(1, 0);

  return set.size;
}

console.log(solution(n1, road1, k1));
console.log(solution(n2, road2, k2));

// 객체 기반 다익스트라 알고리즘 (간소화)
function solution2(N, road, K) {
  const graph = {};
  road.forEach(([a, b, c]) => {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  });

  const distances = {};
  for (let i = 1; i <= N; i++) {
    distances[i] = Infinity;
  }
  distances[1] = 0; // 시작 노드

  const queue = [[0, 1]];

  while (queue.length) {
    const [dist, node] = queue.shift();

    if (dist > distances[node]) continue;

    if (graph[node]) {
      graph[node].forEach(([next, cost]) => {
        const newDist = dist + cost;
        if (newDist < distances[next]) {
          distances[next] = newDist;
          queue.push([newDist, next]);
        }
      });
    }
  }

  return Object.values(distances).filter((dist) => dist <= K).length;
}

// 성능 비교를 위한 테스트
console.log("\n=== 기존 DFS 방식 ===");
console.time("DFS");
console.log("결과1:", solution(n1, road1, k1));
console.log("결과2:", solution(n2, road2, k2));
console.timeEnd("DFS");

console.log("\n=== 다익스트라 방식 ===");
console.time("Dijkstra");
console.log("결과1:", solution2(n1, road1, k1));
console.log("결과2:", solution2(n2, road2, k2));
console.timeEnd("Dijkstra");
