pragma solidity >=0.4.21 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Funding.sol";

contract FundingTest {
    // Truffle will send the TestContract Ether after deploying the contract.
    // See https://truffleframework.com/docs/truffle/testing/writing-tests-in-solidity#in-beta-testing-ether-transactions
    // We need this to test donation.
    uint public initialBalance = 10 ether;
    
    function testSettingAnOwnerDuringCreation() public {
        Funding funding = new Funding();
        Assert.equal(funding.owner(), this, "Owner should be the same as deployer.");
    }

    function testSettingAnOwnerOfDeployedContract() public {
        Funding funding = Funding(DeployedAddresses.Funding());
        Assert.equal(funding.owner(), msg.sender, "Owner should be the same as deployer.");
    }

    function testAcceptingDonations() public {
        Funding funding = new Funding();
        Assert.equal(funding.raised(), 0, "Raised amount should be 0.");
        funding.donate.value(10 finney)();
        Assert.equal(funding.raised(), 10 finney, "Raised amount should equal donation.");
    }
}