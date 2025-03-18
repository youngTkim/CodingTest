//https://school.programmers.co.kr/learn/courses/30/lessons/42586

let progresses = [93, 30, 55];
let speeds = [1, 30, 5];

function solution(progresses, speeds) {
  let answer = [];

  // 각 작업의 완료 일수를 계산
  let days = [];

  for (let i = 0; i < progresses.length; i++) {
    days.push(Math.ceil((100 - progresses[i]) / speeds[i]));
  }
  console.log("days", days);

  // 최대 일수를 찾아서 초기화
  let maxDay = days[0];
  // 최대 일수와 비교하여 개수를 카운트
  let count = 0;

  for (let i = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      // 최대 일수와 같거나 작으면 카운트 증가
      count++;
    } else {
      // 최대 일수를 초기화하고 카운트를 초기화
      answer.push(count);
      count = 1;
      maxDay = days[i];
    }
  }
  answer.push(count);
  return answer;
}

console.log(solution(progresses, speeds));
