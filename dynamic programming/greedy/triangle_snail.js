// https://school.programmers.co.kr/learn/courses/30/lessons/68645

let n1 = 4; //[1,2,9,3,10,8,4,5,6,7]
let n2 = 5; //[1,2,12,3,13,11,4,14,15,10,5,6,7,8,9]
let n3 = 6; //[1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]

function solution(n) {
  // 기본 케이스 처리
  if (n === 1) return [1];
  if (n === 2) return [1, 2, 3];

  // 삼각형 배열 초기화 (2차원 배열)
  const triangle = Array.from({ length: n }, (_, i) =>
    new Array(i + 1).fill(0)
  );

  let value = 1; // 채워넣을 숫자
  let row = 0; // 현재 행
  let col = 0; // 현재 열
  let direction = 0; // 방향 (0: 아래, 1: 오른쪽, 2: 왼쪽 위)

  // 전체 채워야 할 숫자의 개수
  const total = (n * (n + 1)) / 2;

  while (value <= total) {
    // 현재 위치에 값 채우기
    triangle[row][col] = value++;

    // 다음 위치 계산
    if (direction === 0) {
      // 아래로 이동
      if (row + 1 < n && triangle[row + 1][col] === 0) {
        row++;
      } else {
        direction = 1;
        col++;
      }
    } else if (direction === 1) {
      // 오른쪽으로 이동
      if (col + 1 < triangle[row].length && triangle[row][col + 1] === 0) {
        col++;
      } else {
        direction = 2;
        row--;
        col--;
      }
    } else {
      // 왼쪽 위로 이동
      if (row - 1 >= 0 && col - 1 >= 0 && triangle[row - 1][col - 1] === 0) {
        row--;
        col--;
      } else {
        direction = 0;
        row++;
      }
    }
  }

  // 2차원 배열을 1차원 배열로 변환
  return triangle.flat();
}

console.log(solution(n1)); //[1,2,9,3,10,8,4,5,6,7]
console.log(solution(n2)); //[1,2,12,3,13,11,4,14,15,10,5,6,7,8,9]
console.log(solution(n3)); //[1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]
