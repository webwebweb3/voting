import React, { useEffect, useState } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";

const Home = () => {
  const [StorageValue, setStorageValue] = useState(0);
  const [Web3Server, setWeb3Server] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [Contract, setContract] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        console.log(web3)
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        console.log(networkId)
  
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        console.log(deployedNetwork)

        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        console.log(instance)
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3Server(web3);
        setAccounts(accounts);
        setContract(instance);
        setLoading(false);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    const runExample = async () => {
      console.log(accounts)
      console.log(Contract)
      // Stores a given value, 5 by default.
      await Contract.methods.set(5).send({ from: accounts[0] });
  
      // Get the value from the contract to prove it worked.
      const response = await Contract.methods.get().call();
  
      // Update state with the result.
      setStorageValue(response);
    };

    runExample();
  }, [accounts, Contract])

  if (!Web3Server) {
      return (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>Loading Web3, accounts, and contract...</div>
          )}
        </>
      );
  } else {
    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="App">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Smart Contract Example</h2>
            <p>
              If your contracts compiled and migrated successfully, below will show
              a stored value of 5 (by default).
            </p>
            <p>
              Try changing the value stored on <strong>line 42</strong> of App.js.
            </p>
            <div>The stored value is: {StorageValue}</div>
          </div>
        )}
      </>
    );
  }
}

export default Home;