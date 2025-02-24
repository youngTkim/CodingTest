function solution(number) {
  let answer = 0;
  for (let i = 0; i < number.length; i++) {
    for (let j = i + 1; j < number.length; j++) {
      for (let k = j + 1; k < number.length; k++) {
        if (number[i] + number[j] + number[k] === 0) {
          /// 중복되지 않는 number[i] + number[j] + number[k] === 0일 때의 조합일때 answer++
          answer++;
        }
      }
    }
  }
  return answer;
}

function solution2(number) {
  const DFS = (answer, current, start) => {
    if (current.length === 3) {
      // DFS 종료 조건에서 새로운 answer 값을 반환
      return (
        // answer은 ex) number = [-1, 0, 1, 2, -1, -4]일 때
        // 이 순서로 answer값이 반환되고 재할당됨

        // 여기서부터 0번 인덱스 + 1번 인덱스 + ~ 나머지 뒤에 인덱스들 시작
        // [-1, 0, 1] 조합일 때 1을 반환
        // [-1, 0, 2] 조합일 때 0을 반환
        // [-1, 0, -1] 조합일 때 0을 반환
        // [-1, 0, -4] 조합일 때 0을 반환

        // 여기서부터 0번 인덱스 + 2번 인덱스 + ~ 나머지 뒤에 인덱스들 시작
        // [-1, 1, 2] 조합일 때 0을 반환
        // [-1, 1, -1] 조합일 때 0을 반환
        // [-1, 1, -4] 조합일 때 0을 반환

        // 여기서부터 0번 인덱스 + 3번 인덱스 + ~ 나머지 뒤에 인덱스들 시작
        // [-1, 2, -1] 조합일 때 0을 반환
        // [-1, 2, -4] 조합일 때 0을 반환

        // 여기서부터 0번 인덱스 + 4번 인덱스 + ~ 나머지 뒤에 인덱스들 시작
        // [-1, -1, -4] 조합일 때 0을 반환

        // 여기서부터 1번 인덱스 + 2번 인덱스 + ~ 나머지 뒤에 인덱스들 시작
        // [0, 1, 2] 조합일 때 0을 반환
        // [0, 1, -1] 조합일 때 0을 반환
        // [0, 1, -4] 조합일 때 0을 반환
        // ....

        answer + (current.reduce((acc, cur) => acc + cur, 0) === 0 ? 1 : 0)
      );
    }

    for (let i = start; i < number.length; i++) {
      // 첫번째 DFS, current.length === 3이 될때 까지 중복되지 않도록
      // [0, 1 ~ number.length, ], [1, 2 ~ number.length, ...]
      // [0, 1, 2 ~ number.length - 1], [0, 1, 3 ~ number.length - 1]
      answer = DFS(answer, [...current, number[i]], i + 1);
    }
    return answer;
  };
  return DFS(0, [], 0);
}
