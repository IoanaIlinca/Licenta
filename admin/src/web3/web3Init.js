import Web3 from "web3";
import DemoContractBuild from './contracts/Demo.json';
import BillRepoContractBuild from './contracts/BillRepo.json';
import ProductRepoContractBuild from './contracts/BillRepo.json';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, updateOrder, updateOrderStatus} from "../redux/apiCalls";
import {emptyEntries, setInitialised} from "../redux/blockchainRedux";

let selectedAccount;

let demoContract;
let billContract;
let productContract;
let isInitialised = false;

export const Init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== "undefined") {
        // Metamask installed
        provider.request({method: 'eth_requestAccounts'}).then((accounts) => {
            selectedAccount = accounts[0];
        }).catch((err) => {
            console.log("error");
            console.log(err.message);
            return;
        });


    }

    window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0];
    });

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();


    console.log(BillRepoContractBuild.networks[networkId].address);
    billContract = new web3.eth.Contract(
        BillRepoContractBuild.abi,
        BillRepoContractBuild.networks[networkId].address
    );
    productContract = new web3.eth.Contract(
        ProductRepoContractBuild.abi,
        ProductRepoContractBuild.networks[networkId].address
    );
    if (billContract) {
        isInitialised = true;
    }
}



export const GetMere = async () => {

 //if(!isInitialised) {
        await Init();
  // }
   // return billContract.methods.getProductForEntry("627244890135ae520c88e028", 0).call();*/
    return billContract.methods.getProduct("627e83cb8177b34059e2e20c").call();

}

export const productAdded = async (id, name, price, VAT) => {
    if(!isInitialised) {
        await Init();
    }

    console.log(
        billContract.methods
    )
    return billContract.methods.productAdded(id, name, price, VAT).call();
   // return false;

}


export const billAdded = async (id) => {
    if(!isInitialised) {
        await Init();
    }

    console.log(
        billContract.methods
    )
    return billContract.methods.idExistsOrders(id).call();
    // return false;

}

export const deployProduct = async (id, name, price, VAT) => {
    if(!isInitialised) {
        await Init();
    }
    console.log("in deploy product");
    billContract.methods.addProduct(id, name, price, VAT).send({ from: selectedAccount })
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
    //if(!isInitialised) {
        await Init();
    //}

    billContract.methods.createBill(id, date, total).send({ from: selectedAccount })
        .on("receipt", function(receipt) {
            console.log("added");
            updateOrder({_id: id, status: "processing"});
            return true;
        })
        .on("error", function(error) {
            // Do something to alert the user their transaction has failed
            alert(error.message)
            updateOrder({_id: id, status: "declined"});
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

export const entryDeployed = async (orderId, entryId, quantity) => {
     if(!isInitialised) {
        await Init();
     }
    console.log(orderId)
    console.log(entryId)
    console.log(quantity)
    return billContract.methods.entryDeployedInCurrentBill(orderId, entryId, quantity).call();

}

export const getProductForEntry = async (orderId, productId) => {

     if(!isInitialised) {
         await Init();
     }
    console.log(orderId);
    console.log(productId);
    return billContract.methods.getProductForEntry(orderId, productId).call();
    //return "ana are mere";
}

export const getBillByOrder = async (orderId) => {
    return billContract.methods.getBillByOrderId(orderId).call();
}
