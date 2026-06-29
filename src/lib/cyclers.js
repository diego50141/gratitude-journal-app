// Barajado y cyclers: recorren una fuente sin repetir hasta agotarla.

export function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createCycler(source) {
  let queue = shuffle(source);
  return function next() {
    if (queue.length === 0) queue = shuffle(source);
    return queue.shift();
  };
}

export function createBatchCycler(source, batchSize) {
  let queue = shuffle(source);
  return function nextBatch() {
    if (queue.length < batchSize) {
      const remainder = queue;
      queue = shuffle(source);
      queue = queue.filter((x) => !remainder.includes(x)).concat(remainder);
      queue = shuffle(queue);
    }
    return queue.splice(0, batchSize);
  };
}
