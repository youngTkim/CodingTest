//https://school.programmers.co.kr/learn/courses/30/lessons/67258

let gems = ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"],
  gems2 = ["ZZZ", "YYY", "NNNN", "YYY", "BBB"]; //[3,7]

// // 시간 초과
// function solution(gems) {
//   let set = new Set(gems);
//   let len = set.size;
//   if (gems.length === set.size) return [1, gems.length];
//   let species;
//   while (len <= gems.length) {
//     for (let i = 0; i < gems.length - len + 1; i++) {
//       let arr = gems.slice(i, i + len);
//       // console.log([i, i + len], gems.slice(i, i + len));
//       species = new Set(arr);
//       if (species.size === set.size) {
//         return [i + 1, i + len];
//       }
//     }
//     len++;
//   }
// }

function solution(gems) {
  // gems의 종류
  const types = new Set(gems).size;
  const gemMap = new Map();
  var answer = [1, gems.length];
  gems.forEach((gem, i) => {
    // 중복되는 잼을 삭제 map.delete(gem), 해당 인덱스로 업데이트해서 등록 map.set(gem, i)
    gemMap.delete(gem);
    gemMap.set(gem, i);
    // 만약 map의 사이즈가 gems의 종류의 개수와 같으면
    if (gemMap.size === types) {
      // map.values의 next()는 들어온 순서대로 출력
      // answer의 원소 시작과 끝의 길이가 더 길면 cand를 answer로 아니면 그대로
      const cand = [gemMap.values().next().value + 1, i + 1];
      answer = answer[1] - answer[0] > cand[1] - cand[0] ? cand : answer;
    }
  });
  return answer;
}

function solution(gems) {
  // gems의 종류
  const types = new Set(gems).size;
  const gemMap = new Map();
  var answer = [1, gems.length];
  gems.forEach((gem, i) => {
    // 중복되는 잼을 삭제 map.delete(gem), 해당 인덱스로 업데이트해서 등록 map.set(gem, i)
    // 자연스럽게 들어온 순서대로 정렬되면 가장 앞에 있는 즉 delete되지 않고 가장 나중에 남아있는 gem이 가장 앞에있는 인덱스가 된다.
    gemMap.delete(gem);
    gemMap.set(gem, i);
    console.log(gemMap);
    // 만약 map의 사이즈가 gems의 종류의 개수와 같으면
    if (gemMap.size === types) {
      // map.values의 next()는 들어온 순서대로 출력
      // answer의 원소 시작과 끝의 길이가 더 길면 cand를 answer로 할당, 아니면 그대로
      // 만약에 뒤에 남아있는 gems배열이 ['EMERALD', 'DIA', 'DIA']면 해당하는 값을 만족하는 것이 두번되므로 [1,2]와 [1,3]이 나오게 되는데
      // 가장 짧은 배열을 그중에서도 가장 먼저 나온 배열을 반환해야하므로 정답배열의 끝 인덱스가 할당된 answer[1]을 더 작은 값으로 할당한다.
      const cand = [gemMap.values().next().value + 1, i + 1];
      answer = answer[1] - answer[0] > cand[1] - cand[0] ? cand : answer;
    }
  });
  return answer;
}

function solution(gems) {
  const cnt = new Set(gems).size;
  var ans = [1, gems.length];

  var l = 0,
    r = 0;
  const hit = new Map();
  hit.set(gems[0], 1);
  while (r < gems.length) {
    if (hit.size === cnt) {
      // 해당 gem들의 종류가 다 들어왔을 때에는
      // lIdx를 점점 더해가면서 해당 ans의 lIdx와 rIdx값을 갱신,
      if (ans[1] - ans[0] > r - l) ans = [l + 1, r + 1];
      // lIdx가 더해져서 왼쪽에서 벗어난 gem의 종류를 hit에서 개수를 뺀다.
      hit.set(gems[l], hit.get(gems[l]) - 1);
      // 만약 보석의 개수가 0이되면 hit에서 삭제
      if (hit.get(gems[l]) === 0) hit.delete(gems[l]);
      l++;
    } else {
      // hit에 해당 gem들의 종류가 다 들어올때까지 rIdx값을 더하면서 (gems[r], 보석의 갯수)로 갱신
      // 다만, 처음 들어올 때는 값을 가장 처음값으로 등록한다
      r++;
      const right = hit.get(gems[r]);
      hit.set(gems[r], right ? right + 1 : 1);
    }
  }
  return ans;
}
let answer = solution(gems);
console.log(answer);
