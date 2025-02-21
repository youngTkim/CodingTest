const nums = [3, 1, 2, 3];

function solution(nums) {
  const maxSelect = nums.length / 2;
  const uniqueTypes = new Set(nums);
  return Math.min(maxSelect, uniqueTypes.size);
}

const answer = solution(nums);
console.log(answer);
