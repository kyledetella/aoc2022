const input = await Deno.readTextFile("./day04/input.txt");

// Convert ranges (["2-4"]) to iterables with each value represented ([2, 3, 4])
const sectionAssignments = input.split("\n").map((pair) => {
  return pair.split(",").map((sectionAssignment) => {
    const [sectionStart, sectionEnd] = sectionAssignment.split("-").map(Number);

    let i = sectionStart + 1;
    const sections = [sectionStart];

    while (i <= sectionEnd) {
      sections.push(i);
      i++;
    }
    return sections;
  });
});

const overlappingAssignmentPairs = sectionAssignments.reduce(
  (accum, [left, right]) => {
    if (left.length <= right.length) {
      if (left.some((num) => right.includes(num))) {
        return accum + 1;
      }
    } else {
      if (right.some((num) => left.includes(num))) {
        return accum + 1;
      }
    }

    return accum;
  },
  0
);

console.log(overlappingAssignmentPairs); // 849
