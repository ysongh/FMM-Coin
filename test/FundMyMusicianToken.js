const { assert } = require('chai');

const FundMyMusicianToken = artifacts.require('./FundMyMusicianToken.sol');

contract(FundMyMusicianToken, ([deployer]) => {
    let fundMyMusicianToken;

    before(async() => {
        fundMyMusicianToken = await FundMyMusicianToken.deployed();
    });

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await fundMyMusicianToken.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
        it('set the total supply to 1000000', async() => {
            const totalSupply = await fundMyMusicianToken.totalSupply();
            assert.equal(totalSupply.toNumber(), 1000000);
        });
        it('give 1000000 tokens to the admin', async() => {
            const admin = await fundMyMusicianToken.balanceOf(deployer);
            assert.equal(admin.toNumber(), 1000000);
        });
    });

})