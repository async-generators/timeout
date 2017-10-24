import timeout from './src';

async function* source() {
  yield 1;
  await new Promise(r => setTimeout(r, 500));
  yield 2;
}

async function main() {
  for await (let item of timeout(source(), 250)) {
    console.log(item);
  }
}

main().catch(console.log);


