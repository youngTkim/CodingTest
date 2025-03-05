// https://school.programmers.co.kr/learn/courses/30/lessons/388351

let schedules1 = [700, 800, 1100],
  timelogs1 = [
    [710, 2359, 1050, 700, 650, 631, 659],
    [800, 801, 805, 800, 759, 810, 809],
    [1105, 1001, 1002, 600, 1059, 1001, 1100],
  ],
  startday1 = 5;

function convertToTimestamp(time) {
  const timestring = time.toString();
  const hour = timestring.slice(0, timestring.length - 2);
  const minute = timestring.slice(timestring.length - 2);
  return Number(hour) * 60 + Number(minute);
}

function solution(schedules, timelogs, startday) {
  let answer = 0;
  let timeLimitTable = {};
  schedules.forEach((schedule, index) => {
    timeLimitTable[index.toString()] = convertToTimestamp(schedule) + 10;
  });

  for (let i = 0; i < timelogs.length; i++) {
    const employeeTimelog = timelogs[i];
    let flag = true;

    for (let j = 0; j < employeeTimelog.length; j++) {
      const dayOfWeek = ((startday + j - 1) % 7) + 1; // 요일 계산 (1-7)

      // 토요일(6)이나 일요일(7)이면 건너뛰기
      if (dayOfWeek === 6 || dayOfWeek === 7) continue;

      const timelog = employeeTimelog[j];
      const scheduleIndex = i.toString();

      if (convertToTimestamp(timelog) > timeLimitTable[scheduleIndex]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      answer++;
    }
  }
  return answer;
}

console.log(solution(schedules1, timelogs1, startday1));
