/// https://school.programmers.co.kr/learn/courses/30/lessons/42577

function solution(phone_book) {
  // 문자열 사전순 정렬
  phone_book.sort();

  // 인접한 두 전화번호만 비교하면 됨
  for (let i = 0; i < phone_book.length - 1; i++) {
    if (phone_book[i + 1].startsWith(phone_book[i])) {
      return false;
    }
  }

  return true;
}

let phone_book1 = ["119", "97674223", "1195524421"]; // false
let phone_book2 = ["123", "456", "789"]; // true
let phone_book3 = ["12", "123", "1235", "567", "88"]; // false

console.log(solution(phone_book1));
console.log(solution(phone_book2));
console.log(solution(phone_book3));
