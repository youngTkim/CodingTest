// https://school.programmers.co.kr/learn/courses/30/lessons/12927

// 문제 설명
// 회사원 Demi는 가끔은 야근을 하는데요, 야근을 하면 야근 피로도가 쌓입니다.
// 야근 피로도는 야근을 시작한 시점에서 남은 일의 작업량을 제곱하여 더한 값입니다. Demi는 N시간 동안 야근 피로도를 최소화하도록 일할 겁니다.
// Demi가 1시간 동안 작업량 1만큼을 처리할 수 있다고 할 때,
// 퇴근까지 남은 N 시간과 각 일에 대한 작업량 works에 대해 야근 피로도를 최소화한 값을 리턴하는 함수 solution을 완성해주세요.

// 제한 사항
// works는 길이 1 이상, 20,000 이하인 배열입니다.
// works의 원소는 50000 이하인 자연수입니다.
// n은 1,000,000 이하인 자연수입니다.
// 입출력 예
// works	n	result
// [4, 3, 3]	4	12
// [2, 1, 2]	1	6
// [1,1]	3	0

// 입출력 예 설명
// 입출력 예 #1
// n=4 일 때, 남은 일의 작업량이 [4, 3, 3] 이라면 야근 지수를 최소화하기 위해 4시간동안 일을 한 결과는 [2, 2, 2]입니다.
// 이 때 야근 지수는 22 + 22 + 22 = 12 입니다.

// 입출력 예 #2
// n=1일 때, 남은 일의 작업량이 [2,1,2]라면 야근 지수를 최소화하기 위해 1시간동안 일을 한 결과는 [1,1,2]입니다.
// 야근지수는 12 + 12 + 22 = 6입니다.

// 입출력 예 #3

// 남은 작업량이 없으므로 피로도는 0입니다.

let works1 = [4, 3, 3],
  n1 = 4;
// result1 = 12;
let works2 = [2, 1, 2],
  n2 = 1;
//  result2 = 6;
let works3 = [1, 1],
  n3 = 3;
//  result3 = 0;

function solution(n, works) {
  // 모든 작업량의 합이 n보다 작거나 같으면 피로도는 0
  const totalWork = works.reduce((sum, work) => sum + work, 0);
  if (totalWork <= n) {
    return 0;
  }

  // 내림차순 정렬
  works.sort((a, b) => b - a);

  let remaining = n;
  let i = 0;

  while (remaining > 0 && i < works.length) {
    // 현재 레벨에서 처리할 수 있는 최대 작업량 계산
    const currentLevel = works[i];
    const nextLevel = i + 1 < works.length ? works[i + 1] : 0;
    const levelDiff = currentLevel - nextLevel;
    const tasksInLevel = i + 1; // 현재 레벨까지의 작업 개수

    // 현재 레벨을 다음 레벨까지 내릴 수 있는지 확인
    const canReduce = Math.min(remaining, levelDiff * tasksInLevel);

    if (canReduce === levelDiff * tasksInLevel) {
      // 현재 레벨을 완전히 다음 레벨로 내릴 수 있음
      for (let j = 0; j <= i; j++) {
        works[j] = nextLevel;
      }
      remaining -= canReduce;
      i++;
    } else {
      // 현재 레벨을 부분적으로만 내릴 수 있음
      const reducePerTask = Math.floor(canReduce / tasksInLevel);
      const extraReduce = canReduce % tasksInLevel;

      for (let j = 0; j <= i; j++) {
        works[j] = currentLevel - reducePerTask - (j < extraReduce ? 1 : 0);
      }
      remaining = 0;
    }
  }

  // 남은 작업량들의 제곱의 합 계산
  return works.reduce((sum, work) => sum + work * work, 0);
}

// 테스트케이스 실행
console.log("테스트케이스 1:", solution(n1, works1)); // 예상: 12
console.log("테스트케이스 2:", solution(n2, works2)); // 예상: 6
console.log("테스트케이스 3:", solution(n3, works3)); // 예상: 0
