# Fund My Musician
A dapp that allows fans to donate token as ERC20 for funds to their favorite musicians

- Live Site - https://fundmymusician.netlify.app/  (Only works in Kovan Test Networks)

## Info

### Project name
Fund My Musician

### Link to working code in a public repo OR PR link to a public repo
https://github.com/ysongh/FMM-Coin/tree/unstoppabledomains

### Recorded video demo of the integration (max. 3 mins)
https://youtu.be/7UhMVod7ge8

### Person of contact in case there are any questions
You Song#4593

### Discord ID
You Song#4593

### UnstoppableDomain registered account email address
ysongweb3@gmail.com

## Features
- Fans can purchase ERC-20 called FMM
- Fans can support their favorite musician by donating FMM
- Musicians can upload their music for fans to see
- Musicians can sell FMM for fund

## Technologies
- React
- Bootstrap 4
- Firebase
- Solidity
- Truffle
- Web3
- Unstoppable Domains Login

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Create a file called 'config.js' on the root folder and add the following code
```
module.exports = {
    MNEMONIC: "",
    applicationId: ""
}
```
- Run `truffle migrate` to deploy the contract
- Run `npm start` to start the dapp

## Disclaimer
These contracts are not audited.  Please review this code on your own before using any of the following code for production.  I will not be responsible or liable for all loss or damage caused from this project.