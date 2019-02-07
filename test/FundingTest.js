const Funding = artifacts.require("Funding");
const truffleAssert = require('truffle-assertions');

const FINNEY = 1; // 10**15 wei

// contract (instead of describe) does some cleanup and provides a list of available accounts. 
// The first account is used by default during tests.
contract("Funding", accounts => {
  const [firstAccount] = accounts;

  let funding;

  beforeEach(async () => {
    funding = await Funding.new();
  });

  it("sets an owner", async () => {
    assert.equal(await funding.owner.call(), firstAccount);
  });

  it("accepts donations", async () => {
    await funding.donate({ from: firstAccount, value: 10 * FINNEY });
    assert.equal(await funding.raised.call(), 10 * FINNEY);
  });

  it("emits event with correct donation and assigned contribution tier", async () => {
    let result = await funding.donate({ from: firstAccount, value: 10 * FINNEY });

    const expectedAmount = 10;
    const expectedTierDescription = 'Groupie';
    
    truffleAssert.eventEmitted(result, 'Contributed', (ev) => {
      console.log('Event Info');
      console.log('----------');
      console.log('Address = ' + ev.from);
      console.log('Amount = ' + ev.amount);
      console.log('Description = ' + ev.tierDescription);

      return ev.amount == expectedAmount && ev.tierDescription == expectedTierDescription;
    }, `Contributed amount and description should be ${expectedAmount} and  ${expectedTierDescription}.`);
  });
});