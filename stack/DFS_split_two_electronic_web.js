// https://school.programmers.co.kr/learn/courses/30/lessons/86971

let n1 = 9,
  wires1 = [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ]; //3
let n2 = 4,
  wires2 = [
    [1, 2],
    [2, 3],
    [3, 4],
  ]; //0
let n3 = 7,
  wires3 = [
    [1, 2],
    [2, 7],
    [3, 7],
    [3, 4],
    [4, 5],
    [6, 7],
  ]; //1

function solution(n, wires) {
  let answer = Infinity;
  let map = {};

  for (let i = 0; i < wires.length; i++) {
    let [a, b] = wires[i];

    map[a] = map[a] ? [...map[a], b] : [b];
    map[b] = map[b] ? [...map[b], a] : [a];
  }

  for (let i = 0; i < wires.length; i++) {
    let [a, b] = wires[i];

    let visited = new Set();
    let count = dfs(a, b, visited);
    let diff = Math.abs(count - (n - count));

    answer = Math.min(answer, diff);
  }

  // DFS 함수: 현재 노드, 연결을 끊은 상대 노드, 방문 여부
  function dfs(current, except, visited) {
    // 이미 방문한 노드라면 0 반환
    if (visited.has(current)) return 0;
    // 현재 노드 방문 표시
    visited.add(current);

    // 현재 노드의 인접 노드들
    const neighbors = map[current];
    // 인접한 노드 중 except가 아닌 노드들에 대해 DFS 수행
    let count = 1; // 현재 노드 카운트

    for (const neighbor of neighbors) {
      // 연결을 끊은 노드로는 이동하지 않음
      if (neighbor !== except) {
        count += dfs(neighbor, current, visited);
      }
    }

    return count;
  }

  return answer;
}

console.log(solution(n1, wires1));
console.log(solution(n2, wires2));
console.log(solution(n3, wires3));
