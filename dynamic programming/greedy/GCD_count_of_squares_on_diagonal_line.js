/// https://school.programmers.co.kr/learn/courses/30/lessons/62048

function solution(w, h) {
  // 최대공약수 구하는 함수
  const getGCD = (a, b) => {
    while (b > 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // 최대공약수 계산
  const gcd = getGCD(w, h);

  // 전체 정사각형 개수에서 대각선이 지나가는 정사각형 개수를 뺌
  return w * h - (w + h - gcd);
}

// 테스트
console.log(solution(8, 12)); // 80
