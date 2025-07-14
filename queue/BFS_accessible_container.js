/// https://school.programmers.co.kr/learn/courses/30/lessons/388353
let storage1 = ["AZWQY", "CAABX", "BBDDA", "ACACA"],
  requests1 = ["A", "BB", "A"]; // 11
let storage2 = ["HAH", "HBH", "HHH", "HAH", "HBH"],
  requests2 = ["C", "B", "B", "B", "B", "H"]; //	4

function solution(storage, requests) {
  // 2차원 배열로 변환
  let board = storage.map((row) => row.split(""));
  const rows = board.length;
  const cols = board[0].length;

  // 외부와 연결된 컨테이너 찾기
  function findAccessibleContainers(target) {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const accessible = [];

    // 외부와 연결된 컨테이너 확인
    function isAccessible(r, c) {
      // 가장자리에 있는 경우
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) return true;

      // 상하좌우 중 '.'이 있는 경우
      const dr = [-1, 1, 0, 0];
      const dc = [0, 0, -1, 1];

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (board[nr][nc] === ".") return true;
      }
      return false;
    }

    // 접근 가능한 컨테이너 찾기
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] === target && !visited[r][c] && isAccessible(r, c)) {
          accessible.push([r, c]);
          visited[r][c] = true;
        }
      }
    }

    return accessible;
  }

  // 모든 같은 종류의 컨테이너 찾기
  function findAllContainers(target) {
    const containers = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] === target) {
          containers.push([r, c]);
        }
      }
    }
    return containers;
  }

  // 요청 처리
  for (const request of requests) {
    const target = request[0];
    const isCrane = request.length === 2;

    // 크레인 사용 시
    if (isCrane) {
      const containers = findAllContainers(target);
      for (const [r, c] of containers) {
        board[r][c] = ".";
      }
    }
    // 지게차 사용 시
    else {
      const containers = findAccessibleContainers(target);
      for (const [r, c] of containers) {
        board[r][c] = ".";
      }
    }
  }

  // 남은 컨테이너 수 계산
  let remainingContainers = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] !== ".") remainingContainers++;
    }
  }

  return remainingContainers;
}

console.log(solution(storage1, requests1));
console.log(solution(storage2, requests2));
