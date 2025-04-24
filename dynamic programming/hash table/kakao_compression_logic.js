// https://school.programmers.co.kr/learn/courses/30/lessons/17684

https: function solution(msg) {
  const answer = [];
  const dictionary = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };

  let nextIndex = 27;
  let currentPosition = 0;

  while (currentPosition < msg.length) {
    let currentStr = msg[currentPosition];
    let nextPosition = currentPosition + 1;

    // currentStr 이 사전에 있는지 확인
    // 사전에 없을 때까지 nextPosition을 증가
    while (nextPosition <= msg.length) {
      const nextStr = msg.substring(currentPosition, nextPosition + 1);

      if (!dictionary[nextStr]) break;
      currentStr = nextStr;
      nextPosition++;
    }

    answer.push(dictionary[currentStr]);

    // pointer가 문자열 끝에 도달하지 않았다면
    if (nextPosition <= msg.length) {
      dictionary[currentStr + msg[nextPosition]] = nextIndex++;
      console.log(`dictionary[${currentStr}+${msg[nextPosition]}]`, nextIndex);
    }

    // 다음 위치로 이동
    currentPosition = nextPosition;
  }

  return answer;
}

let msg1 = "KAKAO";
let msg2 = "TOBEORNOTTOBEORTOBEORNOT";
let msg3 = "ABABABABABABABAB";

console.log(solution(msg1)); // [11, 1, 27, 15]
console.log(solution(msg2)); // [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]
console.log(solution(msg3)); // [1, 2, 27, 29, 28, 31, 30]
