/// https://school.programmers.co.kr/learn/courses/30/lessons/84512

let word1 = "AAAAE";
let word2 = "AAAE";
let word3 = "I";
let word4 = "EIO";

function solution(word) {
  const words = ["A", "E", "I", "O", "U"];
  let dictionary = [];

  function DFS(word, depth) {
    if (depth === 5) return;
    for (let i = 0; i < words.length; i++) {
      dictionary.push(word + words[i]);
      DFS(word + words[i], depth + 1);
    }
  }
  DFS("", 0);

  return dictionary.indexOf(word) + 1;
}

console.log(solution(word1));
