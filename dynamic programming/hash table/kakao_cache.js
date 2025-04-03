// https://school.programmers.co.kr/learn/courses/30/lessons/17680

let cacheSize1 = 3;
let cities1 = [
  "Jeju",
  "Pangyo",
  "Seoul",
  "NewYork",
  "LA",
  "Jeju",
  "Pangyo",
  "Seoul",
  "NewYork",
  "LA",
];

function solution(cacheSize, cities) {
  let executionTime = 0;
  // 대소문자 구분 없애기
  cities = cities.map((city) => city.toLowerCase());

  // 캐시 크기가 0인 경우 모든 접근이 miss
  if (cacheSize === 0) {
    return cities.length * 5;
  }

  // LRU 캐시로 Map 사용 (삽입 순서 유지)
  const cache = new Map();

  for (let i = 0; i < cities.length; i++) {
    // 대소문자 구분 없애기
    const city = cities[i];

    // cache hit (캐시에 도시가 있는 경우)
    if (cache.has(city)) {
      executionTime += 1;
      // LRU 알고리즘: 최근 사용된 항목을 맨 뒤로 이동
      cache.delete(city);
      cache.set(city, true);
    }
    // cache miss (캐시에 도시가 없는 경우)
    else {
      executionTime += 5;

      // 캐시가 가득 찬 경우 가장 오래된 항목(맨 앞) 제거
      if (cache.size >= cacheSize) {
        const oldestCity = cache.keys().next().value;
        console.log("oldestCity: ", oldestCity);
        cache.delete(oldestCity);
      }

      // 새 도시를 캐시에 추가
      cache.set(city, true);
    }
    console.log(cache);
  }

  return executionTime;
}

console.log(solution(cacheSize1, cities1));
