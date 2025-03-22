// https://school.programmers.co.kr/learn/courses/30/lessons/42587

let priorities = [2, 1, 3, 2];
let location = 2;

let priorities2 = [1, 1, 9, 1, 1, 1];
let location2 = 0;

function solution(priorities, location) {
  // 프로세스 정보를 저장할 큐 생성 (우선순위와 인덱스 함께 저장)
  const queue = priorities.map((priority, index) => ({
    priority,
    index,
  }));

  let count = 0; // 실행된 프로세스 수

  while (queue.length > 0) {
    // 큐의 맨 앞 프로세스 꺼내기
    const currentProcess = queue.shift();

    // 큐에 남아있는 프로세스 중 우선순위가 더 높은 프로세스가 있는지 확인
    const higherPriorityExists = queue.some(
      (process) => process.priority > currentProcess.priority
    );

    if (higherPriorityExists) {
      // 우선순위가 더 높은 프로세스가 있으면 현재 프로세스를 큐의 맨 뒤로 보냄
      queue.push(currentProcess);
    } else {
      // 우선순위가 가장 높은 프로세스이므로 실행(제거)
      count++;

      // 실행한 프로세스가 찾는 프로세스인지 확인
      if (currentProcess.index === location) {
        return count;
      }
    }
  }

  return count;
}

console.log(solution(priorities, location));
console.log(solution(priorities2, location2));
