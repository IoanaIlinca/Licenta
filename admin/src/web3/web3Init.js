import Web3 from "web3";
import DemoContractBuild from 'contracts/Demo.json';

let selectedAccount;

let demoContract;
let isInitialised = false;

export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== "undefined") {
        // Metamask installed
        provider.request({method: 'eth_requestAccounts'}).then((accounts) => {
            selectedAccount = accounts[0];
        }).catch((err) => {
            console.log(err.message);
            return;
        });


    }

    window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0];
    });

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    demoContract = new web3.eth.Contract(
        DemoContractBuild.abi,
        DemoContractBuild.networks[networkId].address
    );

    isInitialised = true;
}

export const getMere = async () => {
    if(!isInitialised) {
        await init();
    }
   return demoContract.methods.getCounter().call({ gas: 8000000 });
}