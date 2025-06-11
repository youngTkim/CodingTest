// https://school.programmers.co.kr/learn/courses/30/lessons/68936

let arr1 = [
  [1, 1, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
]; //[4, 9];

let arr2 = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 1, 1, 1],
]; //[10, 15];

function solution(arr) {
  let [zeroCount, oneCount] = [0, 0];
  const size = arr.length;

  // 특정 영역이 모두 같은 값인지 확인하는 함수
  const isUniform = (x, y, size) => {
    const targetValue = arr[x][y];
    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        if (arr[i][j] !== targetValue) {
          return false;
        }
      }
    }
    return true;
  };

  // 쿼드트리 압축 함수
  const compress = (x, y, size) => {
    // 크기가 1이면 더 이상 분할할 수 없음
    if (size === 1) {
      if (arr[x][y] === 0) {
        zeroCount++;
      } else {
        oneCount++;
      }
      return;
    }

    // 현재 영역이 모두 같은 값인지 확인
    if (isUniform(x, y, size)) {
      if (arr[x][y] === 0) {
        zeroCount++;
      } else {
        oneCount++;
      }
      return;
    }

    // 같은 값이 아니면 4개 사분면으로 분할
    const halfSize = size / 2;
    compress(x, y, halfSize); // 좌상단
    compress(x, y + halfSize, halfSize); // 우상단
    compress(x + halfSize, y, halfSize); // 좌하단
    compress(x + halfSize, y + halfSize, halfSize); // 우하단
  };

  // 전체 영역에서 압축 시작
  compress(0, 0, size);

  return [zeroCount, oneCount];
}

console.log(solution(arr1));
console.log(solution(arr2));
