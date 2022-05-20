import Web3 from "web3";
import DemoContractBuild from './contracts/Demo.json';
import ProductRepoContractBuild from './contracts/ProductRepo.json';
import BillRepoContractBuild from './contracts/BillRepo.json';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/apiCalls";
import {setInitialised} from "../redux/blockchainRedux";

let selectedAccount;

let productContract;
let demoContract;
let billContract;
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
    productContract = new web3.eth.Contract(
        ProductRepoContractBuild.abi,
        ProductRepoContractBuild.networks[networkId].address
    );
    demoContract = new web3.eth.Contract(
        DemoContractBuild.abi,
        DemoContractBuild.networks[networkId].address
    );
    billContract = new web3.eth.Contract(
        BillRepoContractBuild.abi,
        BillRepoContractBuild.networks[networkId].address
    );
    if (productContract) {
        isInitialised = true;
    }
}



export const GetMere = async () => {

    if(!isInitialised) {
        await Init();
    }

  /* productContract.methods.addProduct("626bd3f0b48eb353f5d023b0", "Puma t-shirt", 7000, 24).send({ from: selectedAccount })
       .on("receipt", function(receipt) {
         console.log("added");
       })
       .on("error", function(error) {
           // Do something to alert the user their transaction has failed
           alert(error.message)
       });*/
}

export const productAdded = async (id, name, price, VAT) => {
    if(!isInitialised) {
        await Init();
    }
    return productContract.methods.productAdded(id, name, price, VAT).call();

}

export const deployProduct = async (id, name, price, VAT) => {
    if(!isInitialised) {
        await Init();
    }
    console.log("in deploy product");
    productContract.methods.addProduct(id, name, price, VAT).send({ from: selectedAccount })
        .on("receipt", function(receipt) {
            console.log("added");
            return true;
        })
        .on("error", function(error) {
            // Do something to alert the user their transaction has failed
            alert(error.message)
            return false;
        });
}

export const deployBill = async (id, date, total) => {
    if(!isInitialised) {
        await Init();
    }

    billContract.methods.createBill(id, date, total).send({ from: selectedAccount })
        .on("receipt", function(receipt) {
            console.log("added");
            return true;
        })
        .on("error", function(error) {
            // Do something to alert the user their transaction has failed
            alert(error.message)
            return false;
        });
}

export const deployEntry = async (orderId, productId, quantity) => {
    if(!isInitialised) {
        await Init();
    }

    billContract.methods.addEntry(orderId, productId, quantity).send({ from: selectedAccount })
        .on("receipt", function(receipt) {
            console.log("added");
            return true;
        })
        .on("error", function(error) {
            // Do something to alert the user their transaction has failed
            alert(error.message)
            return false;
        });
}

