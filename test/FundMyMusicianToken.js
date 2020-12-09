const { assert } = require('chai');

require('chai')
    .use(require('chai-as-promised'))
    .should();

const Token = artifacts.require("Token");
const FundMyMusicianToken = artifacts.require("FundMyMusicianToken");

contract('FundMyMusicianToken', ([deployer, account1, account2, account3]) => {
    let token;
    let fundMyMusicianToken;

    before(async() => {
        token = await Token.new();
        fundMyMusicianToken = await FundMyMusicianToken.new(token.address);

        await token.transfer(fundMyMusicianToken.address, '1000000000000000000000000');
    });

    describe('Token deployment', async() => {
        it('deploys successfully', async() => {
            const address = await token.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
        it('has a name', async () => {
            const name = await token.name();
            assert.equal(name, 'Fund My Musician Token');
        })
        it('set the total supply to 1,000,000', async() => {
            const totalSupply = await token.totalSupply();
            assert.equal(totalSupply.toString(), 1000000000000000000000000);
        });
    });

    describe('FundMyMusicianToken deployment', async() => {
        it('deploys successfully', async() => {
            const address = await fundMyMusicianToken.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
        it('contract has tokens', async () => {
            let balance = await token.balanceOf(fundMyMusicianToken.address);
            assert.equal(balance.toString(), 1000000000000000000000000);
        })
    });

    describe('Buy tokens', async() => {
        let result;
        before(async() => {
            result = await fundMyMusicianToken.buyToken({ from: account2, value: web3.utils.toWei('1', 'ether')});
        })

        it('received the correct amount of token', async() => {
            let userBalance = await token.balanceOf(account2);
            assert.equal(userBalance.toString(), web3.utils.toWei('100', 'ether'));

            let fundMyMusicianTokenBalance = await token.balanceOf(fundMyMusicianToken.address);
            assert.equal(fundMyMusicianTokenBalance.toString(), web3.utils.toWei('999900', 'ether'));

            const event = result.logs[1].args;
            assert.equal(event.account, account2);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), web3.utils.toWei('100', 'ether'));

            // // reject if there is not enough tokens to buy
            // await fundMyMusicianToken.buyToken.call(1000000000000, { from: account1, value: web3.utils.toWei('0.0003', 'Ether') * 300}).should.be.rejected;

            // // reject if the deployer buy the token
            // await fundMyMusicianToken.buyToken.call(300, { from: deployer, value: web3.utils.toWei('0.0003', 'Ether') * 300}).should.be.rejected;
        });

        it('received the correct amount of ETH for fundMyMusicianToken', async() => {
            let fundMyMusicianTokenBalance = await web3.eth.getBalance(fundMyMusicianToken.address);
            assert.equal(fundMyMusicianTokenBalance.toString(), web3.utils.toWei('1', 'Ether'));
        });
    });

    describe('like a musician', async() => {
        xit('sender pay 1 FMM token to like a musician music', async() => {
            const oldBalanace = await fundMyMusicianToken.balanceOf(account1);

            await fundMyMusicianToken.likesMusician({ from: account1 });

            const newBalance = await fundMyMusicianToken.balanceOf(account1);
            assert.notEqual(newBalance.toString(), oldBalanace.toString());

            // reject if there is zero FMM token
            await fundMyMusicianToken.likesMusician.call({ from: account3 }).should.be.rejected;
        });
    });
})