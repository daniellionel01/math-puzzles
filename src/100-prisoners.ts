
const PRISONERS = 10
const ITERS = 1_000_000

function shuffleArray<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function pickRandom() {
  let correct = 0;
  for (let i = 0; i < ITERS; i++) {
    const boxes = []
    for (let p = 1; p <= PRISONERS; p++) {
      boxes.push(p)
    }
    shuffleArray(boxes)

    let won = false
    for (let p = 1; p <= PRISONERS; p++) {
      const visited: number[] = []
      let found = false
      for (let j = 1; j <= PRISONERS/2; j++) {
        const remainingBoxes = boxes.filter((_, b) => !visited.find(x => b === x))
        const index = Math.floor(Math.random() * remainingBoxes.length)
        visited.push(index)
        const pick = remainingBoxes[index]
        if (pick === p) {
          found = true
          break
        }
      }
      if (found) won = true
      else {
        won = false
        break
      }
    }

    if (won) correct += 1
  }
  const prob = correct / ITERS
  console.log("picking at random:", prob)
}

function strategize() {
  let correct = 0;
  for (let i = 0; i < ITERS; i++) {
    const boxes = []
    for (let p = 1; p <= PRISONERS; p++) {
      boxes.push(p)
    }
    shuffleArray(boxes)

    let won = false
    for (let p = 1; p <= PRISONERS; p++) {
      let found = false
      let nextBox = p;
      for (let j = 1; j <= PRISONERS/2; j++) {
        const pick = boxes[nextBox-1]
        nextBox = pick
        if (pick === p) {
          found = true
          break
        }
      }
      if (found) won = true
      else {
        won = false
        break
      }
    }

    if (won) correct += 1
  }
  const prob = correct / ITERS
  console.log("strategize:", prob)
}

pickRandom()
strategize()
