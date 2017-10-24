export default async function* <T>(
  source: AsyncIterable<T>,
  ms: number): AsyncIterable<T> {

  const ita = source[Symbol.asyncIterator]();
  let clock;
  try {
    while (true) {
      let timeout = new Promise((_, x) => { clock = setTimeout(() => x(new Error("timed out")), ms); });
      let next = <IteratorResult<T>>await Promise.race([ita.next(), timeout]);

      clearTimeout(clock);

      if (next.done) {
        return;
      }

      yield next.value;
    }
  } finally {
    clearTimeout(clock);
  }
}
