//https://school.programmers.co.kr/learn/courses/30/lessons/172928

function solution(park, routes) {
  let row = park.findIndex((r) => r.includes("S")),
    col = park[row].indexOf("S");
  let height = park.length,
    width = park[0].length;

  for (let i = 0; i < routes.length; i++) {
    let [direction, count] = routes[i].split(" ");
    count = Number(count);
    let tempRow = row;
    let tempCol = col;
    let canMove = true;

    // 각 방향으로의 이동 가능 여부 확인
    for (let j = 1; j <= count; j++) {
      let newRow = tempRow;
      let newCol = tempCol;

      if (direction === "E") {
        newCol++;
      } else if (direction === "W") {
        newCol--;
      } else if (direction === "S") {
        newRow++;
      } else if (direction === "N") {
        newRow--;
      }

      // 경계 체크 및 장애물 체크
      if (
        newRow < 0 ||
        newRow >= height ||
        newCol < 0 ||
        newCol >= width ||
        park[newRow][newCol] === "X"
      ) {
        canMove = false;
        break;
      }

      tempRow = newRow;
      tempCol = newCol;
    }

    // 이동 가능한 경우에만 위치 업데이트
    if (canMove) {
      row = tempRow;
      col = tempCol;
    }
  }

  return [row, col];
}
