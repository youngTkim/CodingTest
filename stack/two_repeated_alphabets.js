// https://school.programmers.co.kr/learn/courses/30/lessons/12973
function solution(s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    let cur_str = s[i];
    if (stack.length === 0 || stack[stack.length - 1] !== cur_str) {
      stack.push(cur_str);
    } else {
      stack.pop();
    }
  }

  return stack.length === 0 ? 1 : 0;
}

// console.log(solution("aabbaccc"));
console.log(solution("baabaa"));
