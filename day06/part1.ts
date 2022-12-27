const input = await Deno.readTextFile("./day06/input.txt");

let i = 0;
let markerStartIndex = 0;
const hasDuplicateCharacters = (str: string): boolean => /(.).*\1/.test(str);

while (i < input.length) {
  const group = input.slice(i, i + 4);
  if (hasDuplicateCharacters(group)) {
    i += 4;
  } else {
    markerStartIndex = i + 1;
    break;
  }
}

console.log(markerStartIndex);
