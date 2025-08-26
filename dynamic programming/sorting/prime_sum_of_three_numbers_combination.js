// https://school.programmers.co.kr/learn/courses/30/lessons/12977

// 문제 설명
// 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다.
// 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
// nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.
// 입출력 예
// nums	result
// [1,2,3,4]	1
// [1,2,7,6,4]	4

let nums1 = [1, 2, 3, 4];
let nums2 = [1, 2, 7, 6, 4];

// 최적화된 소수 판별 함수
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// 최적화된 solution 함수 (조기 종료 + 정렬 + 백트래킹 개선)
function solution(nums) {
  let answer = 0;
  const n = nums.length;

  // 배열을 오름차순으로 정렬 (조기 종료를 위해)
  const sortedNums = [...nums].sort((a, b) => a - b);

  function combination(start, count, sum) {
    // 조기 종료 조건 1: 이미 3개를 선택했을 때
    if (count === 3) {
      if (isPrime(sum)) {
        answer++;
      }
      return;
    }

    // 조기 종료 조건 2: 남은 숫자들을 모두 선택해도 3개가 안 될 때
    if (count + (n - start) < 3) {
      return;
    }

    // 조기 종료 조건 3: 현재 합계가 너무 클 때
    if (sum > 3000) {
      return;
    }

    for (let i = start; i < n; i++) {
      // 조기 종료 조건 4: 현재 숫자를 더했을 때 이미 너무 크면 건너뛰기
      if (sum + sortedNums[i] > 3000) {
        break;
      }
      combination(i + 1, count + 1, sum + sortedNums[i]);
    }
  }

  combination(0, 0, 0);
  return answer;
}

// 더 효율적인 최적화 버전 (정렬 없이 조기 종료만)
function solutionEfficient(nums) {
  let answer = 0;
  const n = nums.length;

  function combination(start, count, sum) {
    if (count === 3) {
      if (isPrime(sum)) {
        answer++;
      }
      return;
    }

    // 조기 종료: 남은 숫자들을 모두 선택해도 3개가 안 될 때
    if (count + (n - start) < 3) {
      return;
    }

    for (let i = start; i < n; i++) {
      combination(i + 1, count + 1, sum + nums[i]);
    }
  }

  combination(0, 0, 0);
  return answer;
}

// 기존 최적화된 버전 (비교용)
function solutionOriginal(nums) {
  let answer = 0;

  function combination(start, count, sum) {
    if (count === 3) {
      if (isPrime(sum)) {
        answer++;
      }
      return;
    }

    for (let i = start; i < nums.length; i++) {
      combination(i + 1, count + 1, sum + nums[i]);
    }
  }

  combination(0, 0, 0);
  return answer;
}

// 성능 테스트 함수
function performanceTest() {
  console.log("=== 성능 테스트 시작 ===\n");

  // 테스트 케이스들
  const testCases = [
    { name: "작은 입력", data: [1, 2, 3, 4] },
    { name: "중간 입력", data: [1, 2, 7, 6, 4] },
    { name: "큰 입력", data: Array.from({ length: 20 }, (_, i) => i + 1) },
    { name: "매우 큰 입력", data: Array.from({ length: 30 }, (_, i) => i + 1) },
    { name: "극대 입력", data: Array.from({ length: 40 }, (_, i) => i + 1) },
  ];

  testCases.forEach((testCase) => {
    console.log(`--- ${testCase.name} (${testCase.data.length}개 숫자) ---`);

    // 기존 버전 테스트
    const originalStart = performance.now();
    const originalResult = solutionOriginal([...testCase.data]);
    const originalTime = performance.now() - originalStart;

    // 최적화된 버전 테스트
    const optimizedStart = performance.now();
    const optimizedResult = solution([...testCase.data]);
    const optimizedTime = performance.now() - optimizedStart;

    // 효율적인 버전 테스트
    const efficientStart = performance.now();
    const efficientResult = solutionEfficient([...testCase.data]);
    const efficientTime = performance.now() - efficientStart;

    console.log(`결과: ${originalResult} (모든 버전 동일)`);
    console.log(`기존 버전: ${originalTime.toFixed(4)}ms`);
    console.log(
      `최적화된 버전: ${optimizedTime.toFixed(4)}ms (${(
        originalTime / optimizedTime
      ).toFixed(2)}배)`
    );
    console.log(
      `효율적인 버전: ${efficientTime.toFixed(4)}ms (${(
        originalTime / efficientTime
      ).toFixed(2)}배)`
    );
    console.log(
      `가장 빠른 버전: ${Math.min(
        originalTime,
        optimizedTime,
        efficientTime
      ).toFixed(4)}ms\n`
    );
  });

  console.log("=== 성능 테스트 완료 ===");
}

// 기본 테스트
console.log("기본 테스트:");
console.log("최적화된 버전:", solution([...nums1]));
console.log("기존 버전:", solutionOriginal([...nums1]));
console.log("최적화된 버전:", solution([...nums2]));
console.log("기존 버전:", solutionOriginal([...nums2]));
console.log();

// 성능 테스트 실행
performanceTest();
