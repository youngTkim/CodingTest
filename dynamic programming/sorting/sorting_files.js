// https://school.programmers.co.kr/learn/courses/30/lessons/17686

let files1 = [
  "img12.png",
  "img10.png",
  "img02.png",
  "img1.png",
  "IMG01.GIF",
  "img2.JPG",
];
// 출력: ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]

let files2 = [
  "F-5 Freedom Fighter",
  "B-50 Superfortress",
  "A-10 Thunderbolt II",
  "F-14 Tomcat",
];
// 출력: ["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]

let files3 = ["img00012.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"];
// 출력: ["img00012.png", "img02.png", "img01.png", "IMG01.GIF", "img2.JPG"]

let files4 = [
  "img12.png",
  "img10.png",
  "img02.png",
  "img1.png",
  "IMG01.GIF",
  "img2.JPG",
];
// 출력: ["img00012.png", "img02.png", "img01.png", "IMG01.GIF", "img2.JPG"]

function solution(files) {
  return files.sort((a, b) => {
    // HEAD: 숫자가 아닌 문자들 (대소문자 구분 없음)
    const headRegex = /^[^0-9]+/;
    const headA = a.match(headRegex)[0].toLowerCase();
    const headB = b.match(headRegex)[0].toLowerCase();

    // HEAD 부분이 다르면 사전순 정렬
    if (headA !== headB) {
      return headA.localeCompare(headB);
    } else if (headA === headB) {
      // NUMBER: 최대 5자리 숫자 (앞의 0은 무시)
      const numberRegex = /[0-9]{1,5}/;
      const numberA = Number(a.match(numberRegex)[0]);
      const numberB = Number(b.match(numberRegex)[0]);

      // NUMBER가 다르면 숫자 크기순 정렬
      if (numberA !== numberB) {
        return numberA - numberB;
      }
    }

    // HEAD와 NUMBER가 같으면 원래 순서 유지
    return 0;
  });
}

console.log(solution(files1));
console.log(solution(files2));
console.log(solution(files3));
console.log(solution(files4));
