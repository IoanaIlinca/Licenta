import Web3 from "web3";
import DemoContractBuild from 'contracts/Demo.json';
import ProductContractBuild from 'contracts/ProductRepo.json';

let selectedAccount;

let productContract;
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

    productContract = new web3.eth.Contract(
        ProductContractBuild.abi,
        ProductContractBuild.networks[networkId].address
    );

    isInitialised = true;
}

export const getMere = async () => {
    if(!isInitialised) {
        await init();
    }
   return productContract.methods.addProduct("6267bd30d48a6d125b7348e1", "Nike t-shirt", 3000, 24).call({gas: 800000});
}