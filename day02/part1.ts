const input = await Deno.readTextFile("./day02/input.txt");

const opponentsMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const myMap = {
  X: { rps: opponentsMap.A, score: 1 },
  Y: { rps: opponentsMap.B, score: 2 },
  Z: { rps: opponentsMap.C, score: 3 },
};

const winLoseOrDraw = (
  opponentsThrow: keyof typeof opponentsMap,
  myThrow: keyof typeof myMap
): number => {
  if (opponentsThrow === "A") {
    if (myThrow === "Y") {
      return 6;
    }
    if (myThrow === "X") {
      return 3;
    }

    return 0;
  }

  if (opponentsThrow === "B") {
    if (myThrow === "Y") {
      return 3;
    }
    if (myThrow === "X") {
      return 0;
    }

    return 6;
  }

  if (myThrow === "Y") {
    return 0;
  }
  if (myThrow === "X") {
    return 6;
  }

  return 3;
};

const rounds = input.split("\n").map((tuple) => {
  const [opponentsThrow, myThrow] = tuple.split(" ") as [
    keyof typeof opponentsMap,
    keyof typeof myMap
  ];
  const roundScore = winLoseOrDraw(opponentsThrow, myThrow);

  return roundScore + myMap[myThrow].score;
});

console.log(rounds.reduce((accum, val) => accum + val, 0)); // 8890
