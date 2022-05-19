import Web3 from "web3";
import DemoContractBuild from './contracts/Demo.json';
import ProductRepoContractBuild from './contracts/ProductRepo.json';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/apiCalls";
import {setInitialised} from "../redux/blockchainRedux";

let selectedAccount;

let productContract;
let demoContract;
let isInitialised = false;

export const Init = async () => {
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
    console.log(networkId);
    console.log("abi");
    console.log(DemoContractBuild.abi);
    console.log(ProductRepoContractBuild.networks[networkId].address);
    productContract = new web3.eth.Contract(
        ProductRepoContractBuild.abi,
        ProductRepoContractBuild.networks[networkId].address
    );
    demoContract = new web3.eth.Contract(
        DemoContractBuild.abi,
        DemoContractBuild.networks[networkId].address
    );
    if (productContract) {
        isInitialised = true;
    }
}



export const GetMere = async () => {
    //const initialised = useSelector((state) => state.blockchain.initialised);
    if(!isInitialised) {
        await Init();
    }
    console.log(productContract);
   // console.log(selectedAccount);
   productContract.methods.addProduct("626bd3f0b48eb353f5d023b0", "Puma t-shirt", 7000, 24).send({ from: selectedAccount })
       .on("receipt", function(receipt) {
         console.log("added");
       })
       .on("error", function(error) {
           // Do something to alert the user their transaction has failed
           alert(error.message)
       });
  //  return productContract.methods.productAdded("6267bd30d48a6d125b7348e1").call();
}

export const productAdded = async (id) => {
    if(!isInitialised) {
        await Init();
    }
    return productContract.methods.productAdded(id).call();
}