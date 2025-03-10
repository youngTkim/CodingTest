function solution(s) {
  let stack = [s[0]];
  for (let i = 1; i < s.length; i++) {
    let cur = s[i];
    if (stack.at(-1) === "(" && cur === ")") {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }
  return stack.length ? false : true;
}

console.log(solution("()()"));
