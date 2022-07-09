
const ITERS = 1_000_000

function withoutSwitch() {
  let correct = 0
  for (let i = 0; i < ITERS; i++) {
    // Solution is door 0, 1 or 2
    const solution = Math.floor(Math.random() * 3)

    // Pick 0, 1 or 2
    const pick = Math.floor(Math.random() * 3)

    // Check if you picked the correct door
    if (solution === pick) {
      correct += 1
    }
  }
  const prob = correct / ITERS
  console.log(`without switching: ${(prob * 100).toFixed(2)}%`)
}

function withSwitch() {
  let correct = 0
  for (let i = 0; i < ITERS; i++) {
    // Solution is door 0, 1 or 2
    const doors = [0, 1, 2]
    const solution = Math.floor(Math.random() * 3)

    // Pick 
    let pick = Math.floor(Math.random() * 3)

    // Be shown a door which is not the solution and not your pick
    const shown = doors.find(x => x !== pick && x !== solution)
    if (shown === undefined) throw Error("Did not find an open door")

    // Can't pick that door anymore
    doors.splice(shown, 1)

    // Pick from the remaining 2 doors
    pick = Math.floor(Math.random() * doors.length)
    pick = doors[pick]
    if (solution === pick) {
      correct += 1
    }
  }
  const prob = correct / ITERS
  console.log(`with switching: ${(prob * 100).toFixed(2)}%`)
}

withoutSwitch()
withSwitch()
