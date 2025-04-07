// https://school.programmers.co.kr/learn/courses/30/lessons/87946

// 초기 피로도
let k1 = 80;
// 던전 정보 배열 [최소 필요 피로도, 소모 피로도]
let dungeons1 = [
  [80, 20],
  [50, 40],
  [30, 10],
];

function solution(k, dungeons) {
  // 최대 던전 탐험 수를 저장할 변수
  let answer = 0;
  // 던전 방문 여부를 추적하는 배열 (false로 초기화)
  let visited = new Array(dungeons.length).fill(false);

  function DFS(k, count) {
    // 모든 던전을 순회하며 탐험 가능 여부 확인
    for (let i = 0; i < dungeons.length; i++) {
      // 던전의 최소 필요 피로도와, 소모 피로도 추출
      let [min, use] = dungeons[i];
      // 아직 방문하지 않았고, 현재 피로도가 최소 필요 피로도 이상인 경우
      if (!visited[i] && k >= min) {
        // 던전 방문 표시
        visited[i] = true;
        // 피로도를 소모하고, 던전 카운트를 증가시켜 다음 던전 탐색
        DFS(k - use, count + 1);
        // 백트래킹: 방문 표시 취소 (다른 탐험 경로 탐색을 위해)
        visited[i] = false;
      }
    }
    // 현재 경로에서의 던전 수와 지금까지의 최대값 비교하여 갱신
    answer = Math.max(answer, count);
  }

  // 초기 피로도와 던전 수 0으로 DFS 시작
  DFS(k, 0);
  // 최대 던전 탐험 수 반환
  return answer;
}

// 결과 출력
console.log(solution(k1, dungeons1));
