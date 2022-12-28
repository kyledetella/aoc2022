const input = await Deno.readTextFile("./day06/input.txt");

const MESSAGE_LENGTH = 14;
let i = 0;
let messageStartIndex = 0;
const hasDuplicateCharacters = (str: string) => /(.).*\1/.test(str);

while (i < input.length) {
  const group = input.slice(i, i + MESSAGE_LENGTH);

  if (hasDuplicateCharacters(group)) {
    i++;
  } else {
    messageStartIndex = i + MESSAGE_LENGTH;
    break;
  }
}

console.log(messageStartIndex);
