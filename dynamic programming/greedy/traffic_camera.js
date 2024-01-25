// https://school.programmers.co.kr/learn/courses/30/lessons/42884

let routes = [
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
]; // 2

function solution(routes) {
  let answer = 1; // 1번 관점으로 접근

  routes.sort((a, b) => a[0] - b[0]);

  // 진입 시점을 기준으로 오름차순 정렬
  // [ [ -20, -15 ], [ -18, -13 ], [ -14, -5 ], [ -5, -3 ] ]

  let out = routes[0][1];
  // 첫 진출시점(out)은 첫 차량의 진출시점으로 초기화

  for (let i = 1; i < routes.length; i++) {
    // 진출시점보다 현재 차량의 진입이 느리다면
    // 카메라 추가 설치 및 out 시점 갱신
    if (out < routes[i][0]) {
      answer++;
      out = routes[i][1];
    }

    // 진출시점이 현재 차량의 진출시점보다 큰 경우
    // 항상 out을 갱신해주어야
    // 다음 차량 카메라 설치 여부 판별 가능
    if (out > routes[i][1]) {
      out = routes[i][1];
    }
    // 1번째 if문 ex) [-20, -15], [-14, -12]면 out이 -15인 상태에서 이런 상태면 겹치는 지점을 찾을 수 없으므로 answer을 더하고 -12로 out을 갱신
    // 2번째 if문 ex) [-20, -15], [-19, -16]면 out을 -16로 갱신해야 두 지점을 포함한 최대 중첩지점을 찾을 수 있음
    // 통과하지 못한 경우의 수 [-20, -15], [-19, -14]면 최대 중첩을 찾기 위해 -15를 갱신하지 않고 다음 route[i]로 넘어간다.
  }

  return answer;
}

let answer = solution(routes);
console.log(answer);
