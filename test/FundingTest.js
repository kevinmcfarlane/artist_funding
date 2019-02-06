const Funding = artifacts.require("Funding");

const FINNEY = 10**15;

// contract (instead of describe) does some cleanup and provides a list of available accounts. 
// The first account is used by default during tests.
contract("Funding", accounts => {
  const [firstAccount] = accounts;

  it("sets an owner", async () => {
    const funding = await Funding.new();
    assert.equal(await funding.owner.call(), firstAccount);
  });

  it("accepts donations", async () => {
    const funding = await Funding.new();
    await funding.donate({ from: firstAccount, value: 10 * FINNEY });
    assert.equal(await funding.raised.call(), 10 * FINNEY);
  });
});