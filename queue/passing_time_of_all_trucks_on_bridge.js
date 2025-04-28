/// https://school.programmers.co.kr/learn/courses/30/lessons/42583

let bridge_length = 2;
let weight = 10;
let truck_weights = [7, 4, 5, 6];

function solution(bridge_length, weight, truck_weights) {
  // 경과 시간
  let time = 0;

  // 다리 위의 트럭 상태를 나타내는 큐 (다리 길이만큼 0으로 초기화)
  const bridge = Array(bridge_length).fill(0);

  // 다리 위 트럭의 총 무게
  let bridgeWeight = 0;

  // 대기 중인 트럭이 있거나 다리 위에 트럭이 있는 동안 반복
  while (truck_weights.length > 0 || bridgeWeight > 0) {
    // 시간 증가
    time++;

    // 다리의 맨 앞에서 트럭 빼기 (다리를 완전히 건넌 트럭)
    const outTruck = bridge.shift();
    bridgeWeight -= outTruck;

    // 대기 중인 트럭이 있고, 다리에 새 트럭을 올릴 수 있는 경우
    if (truck_weights.length > 0 && bridgeWeight + truck_weights[0] <= weight) {
      const inTruck = truck_weights.shift();
      bridge.push(inTruck);
      bridgeWeight += inTruck;
    } else {
      // 새 트럭을 올릴 수 없는 경우, 빈 공간(0)을 추가
      bridge.push(0);
    }
  }

  return time;
}

console.log(solution(bridge_length, weight, truck_weights));
