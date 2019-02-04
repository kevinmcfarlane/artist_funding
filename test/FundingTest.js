const Funding = artifacts.require("Funding");

// contract (instead of describe) does some cleanup and provides a list of available accounts. 
// The first account is used by default during tests.
contract("Funding", accounts => {
  const [firstAccount] = accounts;

  it("sets an owner", async () => {
    const funding = await Funding.new();
    assert.equal(await funding.owner.call(), firstAccount);
  });
});