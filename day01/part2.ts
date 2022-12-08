// Get sum of calories from top 3 elves
const input = await Deno.readTextFile("./day01/input.txt");

const caloriesPerElf = input.split("\n").reduce(
  (accum, calorie) => {
    if (calorie === "") {
      return [...accum, 0];
    }

    accum.splice(
      accum.length - 1,
      1,
      accum[accum.length - 1] + Number(calorie)
    );

    return accum;
  },
  [0]
);

console.log(
  caloriesPerElf
    .sort((a, b) => {
      if (a < b) {
        return 1;
      }

      if (a > b) {
        return -1;
      }

      return 0;
    })
    .slice(0, 3)
    .reduce((accum, val) => accum + val, 0)
);
// 206643
