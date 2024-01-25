// https://school.programmers.co.kr/learn/courses/30/lessons/67258

let gems = ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"],
  gems2 = ["ZZZ", "YYY", "NNNN", "YYY", "BBB"]; //[3,7]

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
