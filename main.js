function nextMoves([x, y]) {
  const moves = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  return moves
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([newX, newY]) => newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7);
}

function knightMoves(start, target) {
  const queue = [];
  const traversal = [];
  const visited = new Set();
  const nodeDepth = new Map();
  queue.push(start);
  let curr;
  while (queue.length !== 0) {
    curr = queue.shift();
    const next = nextMoves(curr);
    //When target is within the next move break out of while loop early 
    if (next.some(([x, y]) => x === target[0] && y === target[1])) {
      break;
    }
    visited.add(curr.toString());
    //For each next move only add to the queue if it has not been visited already. If it has not appeared already store a key value pair of the move and it's originating move
    next.forEach((element) => {
      if (!nodeDepth.has(element.toString())) {
        nodeDepth.set(element.toString(),JSON.stringify(curr))
      }
      if (visited.has(element.toString())) return;
      queue.push(element);
    })

  }
  traversal.push(curr)
  //Build the array of the moves from the store previous moves in the map
  while (curr.toString() !== start.toString()) {
    traversal.push(JSON.parse(nodeDepth.get(curr.toString())));
    curr = JSON.parse(nodeDepth.get(curr.toString()));
  }
  traversal.unshift(target)
  console.log(traversal.toReversed())
}
knightMoves([3, 3],[0,0]);
