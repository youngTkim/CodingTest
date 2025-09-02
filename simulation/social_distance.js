// https://school.programmers.co.kr/learn/courses/30/lessons/81302

// 문제 설명
// 개발자를 희망하는 죠르디가 카카오에 면접을 보러 왔습니다.

// 코로나 바이러스 감염 예방을 위해 응시자들은 거리를 둬서 대기를 해야하는데 개발 직군 면접인 만큼
// 아래와 같은 규칙으로 대기실에 거리를 두고 앉도록 안내하고 있습니다.

// 대기실은 5개이며, 각 대기실은 5x5 크기입니다.
// 거리두기를 위하여 응시자들 끼리는 맨해튼 거리1가 2 이하로 앉지 말아 주세요.
// 단 응시자가 앉아있는 자리 사이가 파티션으로 막혀 있을 경우에는 허용합니다.

// 5개의 대기실을 본 죠르디는 각 대기실에서 응시자들이 거리두기를 잘 기키고 있는지 알고 싶어졌습니다.
// 자리에 앉아있는 응시자들의 정보와 대기실 구조를 대기실별로 담은 2차원 문자열 배열 places가 매개변수로 주어집니다.
// 각 대기실별로 거리두기를 지키고 있으면 1을, 한 명이라도 지키지 않고 있으면 0을 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

let places1 = [
  ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
  ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
  ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
  ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
  ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
]; // [1, 0, 1, 1, 1]

function manhattanDistance(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

function solution(places) {
  const answer = [];

  // 각 대기실에 대해 거리두기 검사
  for (const place of places) {
    answer.push(checkSocialDistancing(place) ? 1 : 0);
  }

  return answer;
}

// 거리두기 검사 함수
function checkSocialDistancing(place) {
  const people = [];

  // 응시자(P)의 위치 찾기
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (place[i][j] === "P") {
        people.push([i, j]);
      }
    }
  }

  // 모든 응시자 쌍에 대해 거리두기 검사
  for (let i = 0; i < people.length; i++) {
    for (let j = i + 1; j < people.length; j++) {
      const [r1, c1] = people[i];
      const [r2, c2] = people[j];
      const distance = manhattanDistance(r1, c1, r2, c2);

      // 맨해튼 거리가 2 이하인 경우 거리두기 위반 가능성
      if (distance <= 2) {
        // 파티션으로 막혀있는지 확인
        if (!isPartitioned(place, r1, c1, r2, c2, distance)) {
          return false; // 거리두기 위반
        }
      }
    }
  }

  return true; // 모든 거리두기 규칙 준수
}

// 두 지점 사이에 파티션이 있는지 확인하는 함수
function isPartitioned(place, r1, c1, r2, c2) {
  const distance = manhattanDistance(r1, c1, r2, c2);

  // 맨해튼 거리가 1인 경우 (바로 옆자리)
  if (distance === 1) {
    return false; // 파티션이 있어도 거리두기 위반
  }

  // 맨해튼 거리가 2인 경우
  if (distance === 2) {
    // 같은 행에 있는 경우
    if (r1 === r2) {
      const minC = Math.min(c1, c2);
      const maxC = Math.max(c1, c2);
      // 두 지점 사이에 파티션이 있는지 확인
      return place[r1][minC + 1] === "X";
    }

    // 같은 열에 있는 경우
    if (c1 === c2) {
      const minR = Math.min(r1, r2);
      const maxR = Math.max(r1, r2);
      // 두 지점 사이에 파티션이 있는지 확인
      return place[minR + 1][c1] === "X";
    }

    // 대각선에 있는 경우 (맨해튼 거리 2)
    // 두 지점 사이의 경로에 파티션이 있는지 확인
    // 이미지 규칙에 따르면 두 경로 모두 파티션이 있어야 함
    const path1 = place[r1][c2]; // 첫 번째 지점에서 두 번째 지점으로 가는 경로
    const path2 = place[r2][c1]; // 두 번째 지점에서 첫 번째 지점으로 가는 경로

    // 두 경로 모두 파티션이 있어야 거리두기 준수
    return path1 === "X" && path2 === "X";
  }

  return true; // 맨해튼 거리가 3 이상이면 거리두기 준수
}

// 테스트
console.log(solution(places1)); // [1, 0, 1, 1, 1]
