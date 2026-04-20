// https://school.programmers.co.kr/learn/courses/30/lessons/468373

// 문제 설명
// 1번부터 n번까지 번호가 붙은 n개의 배양체를 n-1개의 파이프로 이어 하나의 트리 모양을 만들었습니다. 각 파이프는 A,B,C 3개의 종류 중 하나로 초기에 모든 파이프는 닫혀있습니다.

// 배양체 중 하나가 바이러스에 감염되어 있습니다. 바이러스에 감염된 배양체는 열린 파이프를 통해 연결된 다른 인접한 배양체를 감염시킵니다.

// 당신은 종류가 같은 파이프를 한꺼번에 모두 열었다가 닫을 수 있습니다. 단, 한 종류의 파이프를 연 후 다시 닫기 전에 다른 종류의 파이프를 열 수 없습니다. 파이프를 열었다 닫는 행동을 최대 k번 반복해 최대한 많은 배양체에 바이러스를 감염시키려고 합니다.

// 배양체의 개수를 나타내는 정수 n, 감염된 배양체의 노드 번호를 나타내는 정수 infection, 파이프의 정보를 나타내는 2차원 정수 배열 edges, 최대 행동 수를 나타내는 정수 k가 매개변수로 주어집니다. 최대 k번 파이프를 열었다 닫은 후, 감염된 배양체 개수의 최댓값을 return 하도록 solution 함수를 완성해 주세요.

// 제한사항
// 2 ≤ n ≤ 100
// 1 ≤ infection ≤ n
// edges의 길이 = n-1
// edges[i]는 [x, y, type]의 형태로 x번 노드의 배양체와 y번 노드의 배양체 사이가 type 종류의 파이프로 연결되어 있음을 의미합니다.
// 1 ≤ x < y ≤ n
// 1 ≤ type ≤ 3
// 1은 A, 2는 B, 3은 C 를 나타냅니다.
// 1 ≤ k ≤ 10

let n = 10,
  infection = 1,
  edges = [
    [1, 2, 1],
    [1, 3, 1],
    [1, 4, 3],
    [1, 5, 2],
    [5, 6, 1],
    [5, 7, 1],
    [2, 8, 3],
    [2, 9, 2],
    [9, 10, 1],
  ],
  k = 2;

function solution(n, infection, edges, k) {
  let graph = {
    1: Array.from({ length: n + 1 }, () => []),
    2: Array.from({ length: n + 1 }, () => []),
    3: Array.from({ length: n + 1 }, () => []),
  };

  for (let i = 0; i < edges.length; i++) {
    let [u, v, type] = edges[i];
    graph[type][u].push(v);
    graph[type][v].push(u);
  }

  let components = {
    1: Array.from({ length: n + 1 }, () => []),
    2: Array.from({ length: n + 1 }, () => []),
    3: Array.from({ length: n + 1 }, () => []),
  };

  // 각 파이프 종류(1=A, 2=B, 3=C)별로 연결 요소(Connected Component)를 미리 구합니다.
  // components에 파이프 종류에 따른 배열 안에 해당 파이프가 열렸을때 서로 직접 연결되는 노드의 종류들을 묶어놓은 것
  for (let type = 1; type <= 3; type++) {
    // visited 배열을 통해 이미 특정 연결 요소로 묶인 배양체인지 확인합니다.
    let visited = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
      // 아직 탐색하지 않은 배양체(i)가 있다면, 새로운 연결 요소 탐색을 시작합니다.
      if (!visited[i]) {
        let comp = []; // 이번 탐색에서 발견할 하나의 열린 파이프 덩어리를 담을 배열
        let queue = [i]; // BFS(너비 우선 탐색)를 위한 큐
        visited[i] = true;
        let head = 0;
        
        while (head < queue.length) {
          let curr = queue[head++];
          comp.push(curr); // 현재 배양체를 덩어리에 추가

          // 현재 배양체와 같은 타입의 파이프로 이어진 인접 배양체를 모두 확인합니다.
          for (let j = 0; j < graph[type][curr].length; j++) {
            let next = graph[type][curr][j];
            if (!visited[next]) {
              visited[next] = true;
              queue.push(next); // 큐에 넣어 다음 번에 이어서 탐색되도록 합니다.
            }
          }
        }
        
        // 탐색이 끝난 후, 한 덩어리로 묶인(comp) 모든 배양체들에게
        // 자신의 덩어리가 무엇인지(배열 참조) 미리 저장해둡니다.
        // 나중에 components[type][node] 로 호출하면 즉시 해당 덩어리를 반환받아 속도를 높일 수 있습니다.
        for (let j = 0; j < comp.length; j++) {
          components[type][comp[j]] = comp;
        }
      }
    }
  }
  // console.log(components);

  let maxInfected = 0;

  function dfs(currInfectedSet, remainedActionCount, lastType) {
    if (currInfectedSet.size > maxInfected) {
      maxInfected = currInfectedSet.size;
    }

    if (remainedActionCount === 0) return;
   
    for (let type = 1; type <= 3; type++) {
       // 이전 타입은 스킵 (같은 타입의 파이프를 연달아 열수없기 때문)
      if (type === lastType) continue;
 
      // 현재 전염된 노드들의 세트를 복사
      let nextInfectedSet = new Set(currInfectedSet);
      let addedComp = new Set();

      // 현재 전염된 노드들을 기준으로 연결된 덩어리들을 모두 찾아서 nextInfectedSet에 추가
      for (let node of currInfectedSet) {
        let comp = components[type][node];
        if (!addedComp.has(comp)) {
          addedComp.add(comp);
          for (let i = 0; i < comp.length; i++) {
            nextInfectedSet.add(comp[i]);
          }
        }
      }
    
      if (nextInfectedSet.size > currInfectedSet.size) {
        dfs(nextInfectedSet, remainedActionCount - 1, type);
      }
    }
  }

  let initialSet = new Set([infection]);
  dfs(initialSet, k, 0);

  return maxInfected;
}

console.log(solution(n, infection, edges, k));
