// https://school.programmers.co.kr/learn/courses/30/lessons/92334

let id_list1 = ["muzi", "frodo", "apeach", "neo"];
let report1 = [
  "muzi frodo",
  "apeach frodo",
  "frodo neo",
  "muzi neo",
  "apeach muzi",
];
let k1 = 2;
//[2,1,1,0];

let id_list2 = ["con", "ryan"];
let report2 = ["ryan con", "ryan con", "ryan con", "ryan con"];
let k2 = 3;
//[0,0];

function solution(id_list, report, k) {
  // 정답으로 반환할 배열
  const answer = Array(id_list.length).fill(0);
  // 해당 유저가 신고한 유저 목록을 저장할 맵
  let user_map = new Map();
  // 해당 유저를 신고한 유저 목록을 저장할 맵
  let reported_map = new Map();

  // 해당 유저가 신고한 유저 목록과 해당 유저를 신고한 유저 목록을 세팅
  for (let i = 0; i < id_list.length; i++) {
    user_map.set(id_list[i], new Set());
    reported_map.set(id_list[i], new Set());
  }

  // report 배열을 순회하며 해당 유저가 신고한 유저 목록과 해당 유저를 신고한 유저 목록을 세팅
  // Set함수를 사용하기 때문에 한 유저가 어떤 유저를 중복해서 신고해도 한 번만 카운트됨
  for (let i = 0; i < report.length; i++) {
    let [user, reported] = report[i].split(" ");
    user_map.get(user).add(reported);
    reported_map.get(reported).add(user);
  }

  // id_list를 순회하면서 id_list[i] 유저가 신고한 유저 목록 중에서 k번 이상 신고받은 유저가 있는지 카운트
  // 경우에 만족하는 유저 개수에 따라 answer[i]++;
  for (let i = 0; i < id_list.length; i++) {
    const user = user_map.get(id_list[i]);
    user.forEach((reported) => {
      if (reported_map.get(reported).size >= k) {
        answer[i]++;
      }
    });
  }
  return answer;
}

let result = solution(id_list1, report1, k1);
console.log(result);

// function solution(id_list, report, k) {
//   let reports = [...new Set(report)].map((a) => {
//     return a.split(" ");
//   });
//   let counts = new Map();
//   for (const bad of reports) {
//     counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
//   }
//   let good = new Map();
//   for (const report of reports) {
//     if (counts.get(report[1]) >= k) {
//       good.set(report[0], good.get(report[0]) + 1 || 1);
//     }
//   }
//   let answer = id_list.map((a) => good.get(a) || 0);
//   return answer;
// }
