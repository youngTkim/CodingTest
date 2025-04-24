// https://school.programmers.co.kr/learn/courses/30/lessons/42839

function solution(numbers) {
  const set = new Set();
  const visited = new Array(numbers.length).fill(false);

  // 가능한 최대 숫자 계산 (numbers의 모든 숫자를 사용한 최대값)
  const maxNum = Number([...numbers].sort((a, b) => b - a).join(""));

  // 에라토스테네스의 체로 소수 배열 생성
  const isPrime = new Array(maxNum + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i <= Math.sqrt(maxNum); i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= maxNum; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // 순열을 만드는 재귀 함수
  const makeNumber = (current) => {
    // 현재 만들어진 숫자가 소수인지 확인
    if (current.length > 0) {
      const num = Number(current);
      if (isPrime[num]) {
        // O(1) 시간 복잡도로 소수 판별
        set.add(num);
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        makeNumber(current + numbers[i]);
        visited[i] = false;
      }
    }
  };

  makeNumber("");
  return set.size;
}

// 테스트
console.log(solution("17")); // 3
console.log(solution("011")); // 2
