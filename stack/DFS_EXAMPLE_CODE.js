function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return; // 이미 방문한 노드라면 종료

  console.log(node); // 현재 노드 출력
  visited.add(node); // 방문한 노드 저장

  for (let neighbor of graph[node]) {
    dfs(graph, neighbor, visited); // 재귀적으로 다음 노드 방문
  }
}

// 그래프 (인접 리스트 표현)
const graph = {
  1: [2, 3],
  2: [4, 5],
  3: [6, 7],
  4: [],
  5: [],
  6: [],
  7: [],
};

dfs(graph, 1);
