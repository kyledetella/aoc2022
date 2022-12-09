import { alphabetLowercase, alphabetUppercase } from "../common/index.ts";

const input = await Deno.readTextFile("./day03/input.txt");

const { groups } = input.split("\n").reduce<{
  groups: string[][];
  group: string[];
}>(
  (accum, line, index, collection) => {
    if (accum.group.length < 3) {
      if (index === collection.length - 1) {
        return {
          groups: [...accum.groups, [...accum.group, line]],
          group: [],
        };
      }
      return {
        ...accum,
        group: [...accum.group, line],
      };
    } else {
      return {
        groups: [...accum.groups, accum.group],
        group: [line],
      };
    }
  },
  { group: [], groups: [] }
);

console.log(groups);

const commonLetterPerGroup = groups.map((group) => {
  const [a, b, c] = group;

  const commonLetter = a.split("").find((char) => {
    return b.includes(char) && c.includes(char);
  });

  let score = 0;
  const lowercasePriorityValue = alphabetLowercase.indexOf(commonLetter);

  if (lowercasePriorityValue > -1) {
    score = lowercasePriorityValue + 1;
  } else {
    score = alphabetUppercase.indexOf(commonLetter) + 27;
  }

  return { commonLetter, score };
});

console.log(commonLetterPerGroup);

const sumOfProperties = commonLetterPerGroup.reduce((accum, val) => {
  return accum + val.score;
}, 0);
console.log(sumOfProperties); //2567
