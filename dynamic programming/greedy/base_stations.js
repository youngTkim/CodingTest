// https://school.programmers.co.kr/learn/courses/30/lessons/12979

let n = 11,
  stations = [4, 11],
  w = 1;
let n2 = 16,
  stations2 = [9],
  w2 = 2;

function solution(n, stations, w) {
  let answer = 0;
  const coverage = w * 2 + 1;
  // endPoint는 마지막 기지국 설치 이후로
  // 전파가 닿지 않는 첫 아파트의 위치가 된다.
  const endPoint =
    n -
    stations.reduce((prev, cur) => {
      const apartments = cur - w - 1 - prev;
      // 첫 prev = 0 이기 때문에
      // 첫 아파트 - 현재 기지국 전파 범위 이전 아파트까지
      // 해당하는 구간의 총 아파트 개수를 파악 가능
      // 이후 prev의 값은 현재 기지국 전파 범위 이후 직전,
      // 즉 기지국 간에 전파가 닿지 않는 구간 파악이 가능
      // ex) stations = [4, 11]이고, w는 1일때,
      // 4부터 순회할 때, prev는 0, apartments는 1번부터 cur - w번(3)까지의 아파트 개수가 된다.
      // 11을 순회할 때, prev는 5, apartments는 5번부터 cur - w번(10)까지의 아파트 개수가 된다.
      // 전파가 닿지 않는 연속되는 아파트들의 개수를 기지국의 커버범위로 나눠서 올림한 후 answer에 더한다.
      answer +=
        apartments > 0 ? Math.floor((apartments - 1) / coverage) + 1 : 0;
      return cur + w;
    }, 0);
  // 단 stations[stations.length-1]번 부터 n번 까지의 구간이 비게 되므로 그 구간을 따로 계산해서 answer에 더한다.

  if (endPoint > 0) answer += Math.floor((endPoint - 1) / coverage) + 1;

  return answer;
}

let answer = solution(n, stations, w);
// let answer2 = solution(n2, stations2, w2);
console.log(answer);
