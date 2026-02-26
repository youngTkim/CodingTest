// https://school.programmers.co.kr/learn/courses/30/lessons/72412

let info = [
    "java backend junior pizza 150",
    "python frontend senior chicken 210",
    "python frontend senior chicken 150",
    "cpp backend senior pizza 260",
    "java backend junior chicken 80",
    "python backend senior chicken 50",
  ],
  query = [
    "java and backend and junior and pizza 100",
    "python and frontend and senior and chicken 200",
    "cpp and - and senior and pizza 250",
    "- and backend and senior and - 150",
    "- and - and - and chicken 100",
    "- and - and - and - 150",
  ]; // [1, 1, 1, 1, 2, 4]

function solution(info, query) {
  // (lang, job, career, food) 조합별로 점수 배열을 모아둠
  const map = new Map();

  const langs = ["cpp", "java", "python"];
  const jobs = ["backend", "frontend"];
  const careers = ["junior", "senior"];
  const foods = ["chicken", "pizza"];

  for (const lang of langs)
    for (const job of jobs)
      for (const career of careers)
        for (const food of foods)
          map.set(`${lang}_${job}_${career}_${food}`, []);

  for (const row of info) {
    const [lang, job, career, food, scoreStr] = row.split(" ");
    const score = Number(scoreStr);
    map.get(`${lang}_${job}_${career}_${food}`).push(score);
  }

  // 각 조합별 점수 배열 정렬 (이진 탐색용)
  for (const key of map.keys()) map.get(key).sort((a, b) => a - b);

  // 점수 배열에서 score >= minScore 인 개수 (이진 탐색)
  const countAtLeast = (scores, minScore) => {
    let lo = 0,
      hi = scores.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      // Math.floor((lo + hi) / 2)
      if (scores[mid] < minScore) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return scores.length - lo;
  };

  const answer = [];
  for (const q of query) {
    const [qLang, qJob, qCareer, qFoodScore] = q.split(" and ");
    const [qFood, qScoreStr] = qFoodScore.split(" ");
    const minScore = Number(qScoreStr);

    const langList = qLang === "-" ? langs : [qLang];
    const jobList = qJob === "-" ? jobs : [qJob];
    const careerList = qCareer === "-" ? careers : [qCareer];
    const foodList = qFood === "-" ? foods : [qFood];

    let count = 0;
    for (const lang of langList)
      for (const job of jobList)
        for (const career of careerList)
          for (const food of foodList) {
            const key = `${lang}_${job}_${career}_${food}`;
            count += countAtLeast(map.get(key), minScore);
          }
    answer.push(count);
  }
  return answer;
}

console.log(solution(info, query));
