// https://school.programmers.co.kr/learn/courses/30/lessons/12981

let n1 = 3,
  words = [
    "tank",
    "kick",
    "know",
    "wheel",
    "land",
    "dream",
    "mother",
    "robot",
    "tank",
  ];

let n2 = 2,
  words2 = ["hello", "one", "even", "never", "now", "world", "draw"];

function solution(n, words) {
  let [cur_person, cur_turn] = [0, 0];
  let used_words = new Set();

  for (let i = 0; i < words.length; i++) {
    if (used_words.has(words[i])) {
      cur_person = (i % n) + 1;
      cur_turn = Math.floor(i / n) + 1;
      break;
    }
    if (words[i - 1] && words[i][0] !== words[i - 1].at(-1)) {
      cur_person = (i % n) + 1;
      cur_turn = Math.floor(i / n) + 1;
      break;
    }
    used_words.add(words[i]);
  }

  return [cur_person, cur_turn];
}

// console.log(solution(n1, words));
console.log(solution(n2, words2));
