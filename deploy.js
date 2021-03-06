const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

// Read your credentils from the environment
const ACCOUNT_MNEMONIC = process.env.ACCOUNT_MNEMONIC
const INFURA_URL = process.env.INFURA_URL

const provider = new HDWalletProvider(ACCOUNT_MNEMONIC, INFURA_URL)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi There!'] })
    .send({ from: accounts[0], gas: '1000000' })

  console.log('Contract deployed to ', result.options.address)
}
deploy()
