let routes = [
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
]; // 2
function solution(routes) {
  let arr = routes.map((route) => {
    const [depart, arrive] = route;
    return [Math.abs(arrive), Math.abs(depart)];
  });
  arr.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
}
let answer = solution(routes);
console.log(answer);

// https://school.programmers.co.kr/learn/courses/30/lessons/64064
// let user_id = ["frodo", "fradi", "crodo", "abc123", "frodoc"],
//   banned_id = ["*rodo", "*rodo", "******"];
// let user_id2 = ["frodo", "fradi", "crodo", "abc123", "frodoc"],
//   banned_id2 = ["fr*d*", "abc1**"];
// function solution(user_id, banned_id) {
//   let answer = 0;
//   for (let i = 0; i < banned_id.length; i++) {
//     // banned와 길이가 같은 user만(arr) 순회
//     let banned = banned_id[i];
//     let arr = user_id.filter((user) => banned.length === user.length);

//     for (let j = 0; j < arr.length; j++) {
//       // 길이가 같은 user(arr)를 순회하는동안
//       let user = user_id[j];
//       let flag = true;
//       for (let k = 0; k < user.length; k++) {
//         // 현재 banned와 user의 index를 각각 비교, 하나라도 해당사항이 일치하지않으면 flag=false
//         if (banned[k] !== "*" && banned[k] !== user[k]) {
//           flag = false;
//         }
//       }
//         // 해당하는 index를 찾으면
//       if (flag) {
//         user_id = user_id.filter((id) => id !== user);
//         answer++;
//         break;
//       }
//     }
//   }
//   return answer;
// }

// // let answer = solution(user_id, banned_id);
// let answer2 = solution(user_id2, banned_id2);
// console.log(answer2);

// let A = [5, 1, 3, 7],
//   B = [2, 2, 6, 8]; //3
// let A2 = [2, 2, 2, 2],
//   B2 = [1, 1, 1, 1]; //0

// function solution(A, B) {
//   let answer = 0;
//   A.sort((a, b) => b - a);
//   B.sort((a, b) => a - b);
//   for (let i = 0; i < A.length; i++) {
//     let cur_A = A[i];
//     const max = B[B.length - 1];
//     if (cur_A < max) {
//       answer++;
//       B.pop();
//     }
//   }
//   return answer;
// }
// let answer = solution(A, B);
// console.log(answer);
