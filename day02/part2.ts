const input = await Deno.readTextFile("./day02/input.txt");

// const input = `A Y
// B X
// C Z`;

const opponentsMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const myMap = {
  X: { rps: opponentsMap.A, score: 1, result: "lose" },
  Y: { rps: opponentsMap.B, score: 2, result: "draw" },
  Z: { rps: opponentsMap.C, score: 3, result: "win" },
};

// x=lose, y=draw, z=win
// 0=lost, 3=draw, 6=win
const rounds = input.split("\n").map((tuple) => {
  const [opponentsThrow, result] = tuple.split(" ") as [
    keyof typeof opponentsMap,
    "X" | "Y" | "Z"
  ];

  if (result === "X") {
    // 0 + whatIDidToLose
    if (opponentsThrow === "A") {
      return 0 + 3;
    }

    if (opponentsThrow === "B") {
      return 0 + 1;
    }

    if (opponentsThrow === "C") {
      return 0 + 2;
    }
  }

  if (result === "Y") {
    // 3 + whatIDidToDraw
    if (opponentsThrow === "A") {
      return 3 + 1;
    }

    if (opponentsThrow === "B") {
      return 3 + 2;
    }

    if (opponentsThrow === "C") {
      return 3 + 3;
    }
  }

  if (result === "Z") {
    if (opponentsThrow === "A") {
      return 6 + 2;
    }

    if (opponentsThrow === "B") {
      return 6 + 3;
    }

    if (opponentsThrow === "C") {
      return 6 + 1;
    }
  }
});

console.log(rounds.reduce((accum, val) => accum + val, 0)); // 10238
