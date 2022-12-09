import { alphabetLowercase, alphabetUppercase } from "../common/index.ts";

const input = await Deno.readTextFile("./day03/input.txt");

const compartments = input.split("\n").map((compartment) => {
  return [
    compartment.substring(0, compartment.length / 2),
    compartment.substring(compartment.length / 2),
  ];
});

const duplicateItemsFromCompartments = compartments.map(
  ([compartment1, compartment2]) => {
    return compartment1.split("").filter((item) => {
      return compartment2.includes(item);
    });
  }
); // 8072

console.log(
  duplicateItemsFromCompartments
    .map((items) => {
      const [item] = items;
      const lowercasePriorityValue = alphabetLowercase.indexOf(item);

      if (lowercasePriorityValue > -1) {
        return lowercasePriorityValue + 1;
      }

      return alphabetUppercase.indexOf(item) + 27;
    })
    .reduce((accum, val) => accum + val, 0)
); //
