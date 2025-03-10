//https://school.programmers.co.kr/learn/courses/30/lessons/161989

function solution(n, m, section) {
  let answer = 0;
  let wall = Array.from({ length: n }).map((_, idx) =>
    section.includes(idx + 1) ? false : true
  );
  for (let i = 0; i < wall.length; i++) {
    if (wall[i] === false) {
      for (let j = 0; j < m; j++) {
        if (wall[i + j] === false) {
          wall[i + j] = true;
        }
      }
      i = i + m - 1; // 이 부분
      answer++;
    }
  }
  return answer;
}

console.log(solution(8, 4, [2, 3, 6]));
