// https://school.programmers.co.kr/learn/courses/30/lessons/150370

let today = "2022.05.19";
let terms = ["A 6", "B 12", "C 3"];
let privacies = [
  "2021.05.02 A",
  "2021.07.01 B",
  "2022.02.19 C",
  "2022.02.20 C",
];
// [1, 3]

function convertDateToTimestamp(year, month, date) {
  return +year * 12 * 28 + +month * 28 + +date;
}

function convertTimestampToDate(timestamp) {
  const year = Math.floor(timestamp / (12 * 28));
  const month = String(Math.floor((timestamp % (12 * 28)) / 28) + 1).padStart(
    2,
    "0"
  );
  const date = String(timestamp % 28).padStart(2, "0");
  return `${year}.${month}.${date}`;
}

function solution(today, terms, privacies) {
  const answer = [];

  const [t_year, t_month, t_date] = today.split(".");
  const t_timestamp = convertDateToTimestamp(t_year, t_month, t_date);

  const privacy_table = {};
  for (let term of terms) {
    const [type, month] = term.split(" ");
    privacy_table[type] = Number(month);
  }

  for (let i = 0; i < privacies.length; i++) {
    const [date, type] = privacies[i].split(" ");
    const [p_year, p_month, p_date] = date.split(".");
    const p_timestamp = convertDateToTimestamp(p_year, p_month, p_date);
    const p_timestamp_with_term = p_timestamp + privacy_table[type] * 28;
    if (p_timestamp_with_term <= t_timestamp) {
      answer.push(i + 1);
    }
  }
  return answer;
}

console.log(solution(today, terms, privacies));
