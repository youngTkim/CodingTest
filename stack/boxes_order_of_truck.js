/// https://school.programmers.co.kr/learn/courses/30/lessons/131704
let order1 = [4, 3, 1, 2, 5]; // 2
let order2 = [5, 4, 3, 2, 1]; // 5

function solution(order) {
  // 현재 메인 컨테이너 벨트에서 꺼낼 상자 번호 (1부터 n까지)
  let pointer = 1;
  // 보조 컨테이너 벨트 (스택)
  let assistStack = [];
  // 트럭에 실은 상자 개수
  let truck = [];

  for (let i = 0; i < order.length; i++) {
    const currentBox = order[i];

    // 보조 컨테이너의 맨 위 상자가 필요한 상자인 경우
    if (assistStack.length > 0 && assistStack.at(-1) === currentBox) {
      truck.push(assistStack.pop());
      continue;
    }

    // 현재 메인 컨테이너 벨트의 상자가 범위를 벗어나면 종료
    if (pointer > order.length) {
      break;
    }

    // 원하는 상자를 찾을 때까지 메인 벨트에서 상자를 가져옴
    while (pointer <= order.length) {
      // 현재 메인 컨테이너 벨트의 상자가 필요한 상자인 경우
      if (pointer === currentBox) {
        truck.push(pointer);
        pointer++;
        break;
      } else {
        // 아닌 경우 보조 컨테이너에 임시 보관
        assistStack.push(pointer);
        pointer++;
      }
    }
  }

  return truck.length;
}

function solution2(order) {
  let total = 0;
  let box = 1;
  const stack = [];

  while (true) {
    if (order.length === total) break;
    // 현재 박스 번호가 실어져야 할때
    if (order[total] === box) {
      total++;
      box++;
    } else if (stack[stack.length - 1] === order[total]) {
      stack.pop();
      total++;
    } else if (stack[stack.length - 1] !== order[total]) {
      if (order[total] < stack[stack.length - 1]) {
        break;
      }
      stack.push(box);
      box++;
    }
  }

  return total;
}

console.log(solution(order1)); // 2
console.log(solution(order2)); // 5
