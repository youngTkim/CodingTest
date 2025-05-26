// https://school.programmers.co.kr/learn/courses/30/lessons/152996
let weights = [100, 180, 360, 100, 270];
// result = 4;

function solution(weights) {
  let answer = 0;

  // 무게별 등장 횟수 저장
  const weightTable = {};

  const ratio = [
    [1, 1],
    [2, 3],
    [1, 2],
    [3, 4],
  ];
  // 무게별 등장 횟수 계산
  for (const weight of weights) {
    weightTable[weight] = (weightTable[weight] || 0) + 1;
  }

  // 모든 무게 쌍 확인 (동일 무게 포함)
  const uniqueWeights = Object.keys(weightTable).map(Number);

  for (let i = 0; i < uniqueWeights.length; i++) {
    const w1 = uniqueWeights[i];
    const count1 = weightTable[w1];

    // 같은 무게인 사람들의 조합 계산 (nC2)
    if (count1 >= 2) {
      answer += (count1 * (count1 - 1)) / 2;
    }

    for (let j = i + 1; j < uniqueWeights.length; j++) {
      const w2 = uniqueWeights[j];
      const count2 = weightTable[w2];

      // ratio 배열을 활용하여 가능한 모든 비율 체크
      for (const [r1, r2] of ratio) {
        if (w1 * r2 === w2 * r1 || w1 * r1 === w2 * r2) {
          answer += count1 * count2;
          break; // 한 쌍에 대해 한 번만 카운트
        }
      }
    }
  }

  return answer;
}

console.log(solution(weights));
