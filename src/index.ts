if(Symbol["asyncIterator"] === undefined) ((<any>Symbol)["asyncIterator"]) = Symbol.for("asyncIterator");

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
  }
  catch(err){
    clearTimeout(clock);
    ita.return();    
    throw err;
  }  
  finally {
    clearTimeout(clock);
  }
}
