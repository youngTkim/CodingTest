// https://school.programmers.co.kr/learn/courses/30/lessons/135807
let arrayA1 = [10, 17],
  arrayB1 = [5, 20]; //0
let arrayA2 = [10, 20],
  arrayB2 = [5, 17]; //10
let arrayA3 = [14, 35, 119],
  arrayB3 = [18, 30, 102]; //7

function solution(arrayA, arrayB) {
  // 중복 원소 최적화
  arrayA = [...new Set(arrayA)];
  arrayB = [...new Set(arrayB)];

  let 최대공약수A = arrayA[0];
  for (let i = 1; i < arrayA.length; i++) {
    const 현재A원소 = arrayA[i];
    최대공약수A = 최대공약수계산(최대공약수A, 현재A원소);
  }

  // arrayB의 모든 원소들의 최대공약수
  let 최대공약수B = arrayB[0];
  for (let i = 1; i < arrayB.length; i++) {
    const 현재B원소 = arrayB[i];
    최대공약수B = 최대공약수계산(최대공약수B, 현재B원소);
  }

  // 조건 1: gcdA의 약수 중 arrayB의 어떤 원소도 나누지 않는 가장 큰 수
  let A공약수중B원소를나누지않는가장큰수 = 0;
  for (let i = 최대공약수A; i >= 1; i--) {
    const A공약수인지여부 = 최대공약수A % i === 0;
    if (A공약수인지여부) {
      // i는 gcdA의 약수
      let B원소가A공약수로나눠지는가 = false;
      for (let j = 0; j < arrayB.length; j++) {
        const 현재B원소 = arrayB[j];
        if (현재B원소 % i === 0) {
          B원소가A공약수로나눠지는가 = true;
          break;
        }
      }
      if (!B원소가A공약수로나눠지는가) {
        A공약수중B원소를나누지않는가장큰수 = i;
        break;
      }
    }
  }

  // 조건 2: gcdB의 약수 중 arrayA의 어떤 원소도 나누지 않는 가장 큰 수
  let B공약수중A원소를나누지않는가장큰수 = 0;
  for (let i = 최대공약수B; i >= 1; i--) {
    const B공약수인지여부 = 최대공약수B % i === 0;
    if (B공약수인지여부) {
      // i는 gcdB의 약수
      let A원소가B공약수로나눠지는가 = false;
      for (let j = 0; j < arrayA.length; j++) {
        const 현재A원소 = arrayA[j];
        if (현재A원소 % i === 0) {
          A원소가B공약수로나눠지는가 = true;
          break;
        }
      }
      if (!A원소가B공약수로나눠지는가) {
        B공약수중A원소를나누지않는가장큰수 = i;
        break;
      }
    }
  }

  return Math.max(
    A공약수중B원소를나누지않는가장큰수,
    B공약수중A원소를나누지않는가장큰수
  );
}

// 유클리드 호제법을 이용한 최대공약수 계산법
function 최대공약수계산(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

console.log(solution(arrayA1, arrayB1)); // 0
console.log(solution(arrayA2, arrayB2)); // 10
console.log(solution(arrayA3, arrayB3)); // 7
