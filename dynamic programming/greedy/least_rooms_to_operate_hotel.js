// https://school.programmers.co.kr/learn/courses/30/lessons/155651
let book_time1 = [
  ["15:00", "17:00"],
  ["16:40", "18:20"],
  ["14:20", "15:20"],
  ["14:10", "19:20"],
  ["18:20", "21:20"],
]; // 3
let book_time2 = [
  ["09:10", "10:10"],
  ["10:20", "12:20"],
]; // 1
let book_time3 = [
  ["10:20", "12:30"],
  ["10:20", "12:30"],
  ["10:20", "12:30"],
]; // 3

function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}

function solution(book_time) {
  // 시간을 분으로 변환하고 시작 시간 기준으로 정렬
  const reservations = book_time
    .map(([start, end]) => ({
      start: convertTimeToMinutes(start),
      end: convertTimeToMinutes(end),
    }))
    .sort((a, b) => a.start - b.start);

  // 각 방의 종료 시간을 저장하는 배열 (최소 힙 역할)
  const roomEndTimes = [];

  for (const { start, end } of reservations) {
    let roomAssigned = false;

    // 기존 방 중에서 사용 가능한 방 찾기 (청소 시간 10분 포함)
    for (let i = 0; i < roomEndTimes.length; i++) {
      if (roomEndTimes[i] + 10 <= start) {
        // 이 방을 재사용할 수 있음
        roomEndTimes[i] = end;
        roomAssigned = true;
        break;
      }
    }

    // 사용 가능한 방이 없으면 새 방 추가
    if (!roomAssigned) {
      roomEndTimes.push(end);
    }

    // 종료 시간 기준으로 정렬하여 최소 힙 유지
    roomEndTimes.sort((a, b) => a - b);
  }

  return roomEndTimes.length;
}

console.log(solution(book_time1));
console.log(solution(book_time2));
console.log(solution(book_time3));
