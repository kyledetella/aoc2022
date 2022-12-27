// import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";
const input = await Deno.readTextFile("./day05/input.txt");

// Print lines
// console.log(input.split(/\r?\n/));

const inputLines = input.split("\n");
const splitIndex = inputLines.findIndex((val) => val === "");
const rawStacks = inputLines.slice(0, splitIndex).slice(0, -1);
const numberOfStackColumns = Number(
  inputLines.slice(0, splitIndex).slice(-1)[0].split("").slice(-2)[0]
);
const procedures = inputLines.slice(splitIndex + 1);
// Number of chars + space
const COLUMN_WIDTH = 4;

console.log(rawStacks);

const getStackItemIndexes = (str: string) =>
  [...str.matchAll(new RegExp(/\[/, "gi"))].map(({ index }) => index);

const columns: Map<number, string[]> = new Array(numberOfStackColumns)
  .fill("")
  .reduce((accum, _, idx) => {
    return accum.set(idx, []);
  }, new Map());

rawStacks.forEach((stack) => {
  const stackElementIndexes = getStackItemIndexes(stack) as number[];

  stackElementIndexes.forEach((stackElementIndex) => {
    const columnToAddThisItemTo = stackElementIndex / COLUMN_WIDTH;

    const item = stack.substring(stackElementIndex, stackElementIndex + 3);

    if (columns.has(columnToAddThisItemTo)) {
      columns.get(columnToAddThisItemTo)!.push(item);
    }
  });
});

procedures.forEach((procedure) => {
  const [numberOfItemsToMove, _startCol, _endCol] = [
    ...procedure.matchAll(/\d{1,2}/g),
  ].map((x) => Number(x[0]));

  const startCol = _startCol - 1;
  const endCol = _endCol - 1;

  const itemsToMove = columns.get(startCol)!.splice(0, numberOfItemsToMove);

  itemsToMove.forEach((item) => {
    const itemsInNewColumn = columns.get(endCol) || [];

    columns.set(endCol, [item, ...itemsInNewColumn]);
  });
});

const topOfEachStack = [...columns.values()]
  .map((stack) => stack[0])
  .flatMap((x) => x);

console.log("\n\n", topOfEachStack.join("").trim().replace(/\]|\[/g, ""));
