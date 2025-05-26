// https://school.programmers.co.kr/learn/courses/30/lessons/154539
let numbers1 = [2, 3, 3, 5]; // [3, 5, 5, -1]
let numbers2 = [9, 1, 5, 3, 6, 2]; // [-1, 5, 6, 6, -1, -1]

function solution(numbers) {
  const answer = new Array(numbers.length).fill(-1);
  const record = [];
  const stack = []; // record의 인덱스를 저장하는 스택

  // record 배열에 [인덱스, 값] 형태로 저장
  for (let i = 0; i < numbers.length; i++) {
    record.push([i, numbers[i]]);
  }

  for (let i = 0; i < record.length; i++) {
    const [currentIndex, currentValue] = record[i];

    // 현재 숫자가 스택의 top에 있는 record의 값보다 크면
    // 스택의 top에 있는 인덱스들의 뒷 큰수는 현재 숫자
    while (stack.length > 0) {
      const stackTopRecordIndex = stack[stack.length - 1];
      const [prevIndex, prevValue] = record[stackTopRecordIndex];

      if (prevValue < currentValue) {
        stack.pop();
        answer[prevIndex] = currentValue;
      } else {
        break;
      }
    }

    // 현재 record의 인덱스를 스택에 추가
    stack.push(i);
  }

  // 스택에 남아있는 인덱스들은 뒷 큰수가 없으므로 -1로 유지

  return answer;
}

console.log(solution(numbers1)); // [3, 5, 5, -1]
console.log(solution(numbers2)); // [-1, 5, 6, 6, -1, -1]
