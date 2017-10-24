import equal from '@async-generators/equal';
import timeout from '../src';
import { expect } from 'chai';

describe("@async-generator/timeout", () => {
  it("should throw error if source slower than timeout", async () => {
    async function* source() {
      await new Promise(r => setTimeout(r, 500));
      yield 1;
    }

    let error;
    try {
      for await (let item of timeout(source(), 250)) {
        console.log(item);
      }
    }
    catch (err) {
      error = err;
    }

    expect(error.message).to.be.eq("timed out");
  })
})
