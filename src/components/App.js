import { Tabs, Tab } from 'react-bootstrap'
import dBankToken from '../abis/dBank.json'
import React, { useEffect, useState } from 'react';
import Token from '../abis/Token.json'
import dbank from '../dbank.png';
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

const App = (props) =>  {
  const [web3, setWeb3] = useState(undefined)
  const [account, setAccount] = useState('')
  const [token, setToken] = useState(null)
  const [dBank, setDBank] = useState(null)
  const [balance, setBalance] = useState(0)
  const [dBankAddress, setDBankAddress] = useState(null)

  useEffect(() => {
    const load = async () => {
      await loadBlockchainData(props.dispatch)
    }

    load()
  }, [props.dispatch])

const loadBlockchainData = async (dispatch) => {
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum)
    const netId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()

    if (typeof accounts[0] !== 'undefined') {
      const balance = await web3.eth.getBalance(accounts[0])
      setBalance(balance)
      setAccount(accounts[0])
      setWeb3(web3)
    } else {
      window.alert('Please login with Metamask')
    }

    try {
      // bank token
      const dbankAddress = dBankToken.networks[netId].address
      const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
      const dBankT = new web3.eth.Contract(dBankToken.abi, dBankToken.networks[netId].address)
      setToken(token)
      setDBank(dBankT)
      setDBankAddress(dbankAddress)
    } catch(e) {
      console.log(e)
    }

  } else {
    window.alert('Please install Metamask')
  }

    //check if MetaMask exists

      //assign to values to variables: web3, netId, accounts

      //check if account is detected, then load balance&setStates, elsepush alert

      //in try block load contracts

    //if MetaMask not exists push alert
  }

  const deposit = (amount) => {
    //check if this.state.dbank is ok
      //in try block call dBank deposit();
  }

  const withdraw = (e) => {
    //prevent button from default click
    //check if this.state.dbank is ok
    //in try block call dBank withdraw();
  }

  const loginToMetaMask = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    loadBlockchainData()

  }

  console.log(account)

  return (
    <div className='text-monospace'>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
      <img src={dbank} className="App-logo" alt="logo" height="32"/>
        <b>dBank</b>
      </a>
      <button onClick={loginToMetaMask}>Login with metamask</button>
      </nav>
      <div className="container-fluid mt-5 text-center">
      <br></br>
        <h1>{/*add welcome msg*/}</h1>
        <h2>{/*add user address*/}</h2>
        <br></br>
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              {/*add Tab deposit*/}
              {/*add Tab withdraw*/}
            </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
