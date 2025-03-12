// https://school.programmers.co.kr/learn/courses/30/lessons/42885

function solution(people, limit) {
  let l = 0;
  let r = people.length - 1;
  let answer = 0;
  people.sort((a, b) => a - b);

  while (l <= r) {
    if (people[l] + people[r] <= limit) {
      l++;
      r--;
    } else {
      r--;
    }
    answer++;
  }
  return answer;
}
