// https://school.programmers.co.kr/learn/courses/30/lessons/172927

let picks1 = [1, 3, 2],
  minerals1 = [
    "diamond",
    "diamond",
    "diamond",
    "iron",
    "iron",
    "diamond",
    "iron",
    "stone",
  ]; //12

let picks2 = [0, 1, 1],
  minerals2 = [
    "diamond",
    "diamond",
    "diamond",
    "diamond",
    "diamond",
    "iron",
    "iron",
    "iron",
    "iron",
    "iron",
    "diamond",
  ]; //50

function solution(picks, minerals) {
  const [diamond, iron, stone] = picks;
  const totalPicks = diamond + iron + stone;

  // 사용 가능한 곡괭이로 캘 수 있는 광물 그룹만 고려
  const slicedMinerals = minerals.slice(0, totalPicks * 5);

  // 광물을 5개씩 그룹화하고 각 그룹의 피로도 계산
  const groups = [];
  for (let i = 0; i < slicedMinerals.length; i += 5) {
    const group = slicedMinerals.slice(i, i + 5);
    const count = {
      diamond: 0,
      iron: 0,
      stone: 0,
    };

    group.forEach((mineral) => count[mineral]++);

    // 각 곡괭이로 이 그룹을 캘 때의 피로도 계산
    const fatigue = {
      diamond: count.diamond + count.iron + count.stone,
      iron: count.diamond * 5 + count.iron + count.stone,
      stone: count.diamond * 25 + count.iron * 5 + count.stone,
    };

    groups.push(fatigue);
  }

  // 돌 곡괭이로 캤을 때 피로도가 높은 순으로 정렬
  groups.sort((a, b) => b.stone - a.stone);

  let answer = 0;

  const availablePicks = [...picks];

  // 각 그룹에 대해 가능한 가장 좋은 곡괭이 사용
  for (const group of groups) {
    if (availablePicks[0] > 0) {
      answer += group.diamond;
      availablePicks[0]--;
    } else if (availablePicks[1] > 0) {
      answer += group.iron;
      availablePicks[1]--;
    } else if (availablePicks[2] > 0) {
      answer += group.stone;
      availablePicks[2]--;
    } else {
      break;
    }
  }

  return answer;
}

console.log(solution(picks1, minerals1));
console.log(solution(picks2, minerals2));
