/// https://school.programmers.co.kr/learn/courses/30/lessons/42888

let record = [
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan",
]; // ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]

function solution(record) {
  let userLogs = [];
  let user = {};

  const userAction = {
    Enter: "님이 들어왔습니다.",
    Leave: "님이 나갔습니다.",
  };

  for (let i = 0; i < record.length; i++) {
    let [state, uid, name] = record[i].split(" ");

    if (state === "Enter") {
      user[uid] = name;
      userLogs.push([uid, userAction[state]]);
    } else if (state === "Leave") {
      userLogs.push([uid, userAction[state]]);
    } else if (state === "Change") {
      user[uid] = name;
    }
  }

  return userLogs.map(([uid, log]) => user[uid] + log);
}
