pragma solidity >=0.4.21 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Funding.sol";

contract FundingTest {
    function testSettingAnOwnerDuringCreation() public {
        Funding funding = new Funding();
        Assert.equal(funding.owner(), this, "Owner should be the same as deployer.");
    }

    function testSettingAnOwnerOfDeployedContract() public {
        Funding funding = Funding(DeployedAddresses.Funding());
        Assert.equal(funding.owner(), msg.sender, "Owner should be the same as deployer.");
    }
}