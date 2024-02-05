// https://school.programmers.co.kr/learn/courses/30/lessons/43164

let tickets = [
  ["ICN", "JFK"],
  ["HND", "IAD"],
  ["JFK", "HND"],
];
// answer = ["ICN", "JFK", "HND", "IAD"];

function solution(tickets) {
  const answer = [];

  function DFS(from, remainTickets, path) {
    // [...현재까지 방문한 공항들, 현재 도착한 공항]
    const updatedPath = [...path, from];
    if (remainTickets.length === 0) {
      // 모든 티켓을 사용하고
      answer.push(updatedPath);
    } else {
      // 현재 도착한 공항이 출발점이 티켓을 찾는다.
      remainTickets.map((ticket, index) => {
        if (ticket[0] !== from) return;
        const to = ticket[1];
        // 남은 티켓들을 순회하면서 해당 티켓을 제외하고 새로 남은 티켓들을 다시 DFS()에 넣음
        // DFS(해당 티켓의 도착점, 새로 남은 티켓들, 현재까지 방문한 공항들)
        const nextRemainTickets = [...remainTickets];
        nextRemainTickets.splice(index, 1);
        DFS(to, nextRemainTickets, updatedPath);
      });
    }
  }
  DFS("ICN", tickets, []);
  return answer.sort()[0];
}

let answer = solution(tickets);
console.log(answer);
