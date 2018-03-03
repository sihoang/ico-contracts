var TomoCoin = artifacts.require("./TomoCoin.sol");

contract('TomoCoin', function(accounts) {
  it("Total Supply should be 100000000 TOMO", function() {
    return TomoCoin.deployed().then(function(instance) {
      instance.tomoDepositAddress.call().then((tomoDepositAddress) => {
        instance.balanceOf(tomoDepositAddress).then((bl) => {
          return assert.equal(bl.valueOf(), 100000000 * 10**18, "Total Supply is not 100000000 TOMO");
        });
      });
    });
  });

  it("Mint Function should NOT called by anybody", function() {
    return TomoCoin.deployed().then(function(instance) {
      instance.mint(accounts[1], 1000, {from: accounts[2]}).then(() => {
        return assert.equal(1, 0, "Expected to throw");
      }).catch(error => {
        return assert.notEqual(error.message, null, "Expected throw got " + error);
      });
    });
  });
});
