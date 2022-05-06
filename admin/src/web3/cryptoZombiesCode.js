import Web3 from 'web3';

let web3 = new Web3();

var cryptoZombies;
function startApp() {
    var cryptoZombiesAddress = "YOUR_CONTRACT_ADDRESS";
    cryptoZombies = new web3js.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);

    var accountInterval = setInterval(function() {
        // Check if account has changed
        if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
            // Call a function to update the UI with the new account
            getZombiesByOwner(userAccount)
                .then(displayZombies);
        }
    }, 100);
}

function displayZombies(ids) {
    $("#zombies").empty();
    for (id of ids) {
        // Look up zombie details from our contract. Returns a `zombie` object
        getZombieDetails(id)
            .then(function(zombie) {
                // Using ES6's "template literals" to inject variables into the HTML.
                // Append each one to our #zombies div
                $("#zombies").append(`<div class="zombie">
              <ul>
                <li>Name: ${zombie.name}</li>
                <li>DNA: ${zombie.dna}</li>
                <li>Level: ${zombie.level}</li>
                <li>Wins: ${zombie.winCount}</li>
                <li>Losses: ${zombie.lossCount}</li>
                <li>Ready Time: ${zombie.readyTime}</li>
              </ul>
            </div>`);
            });
    }
}

/**
 * We can even query past events using getPastEvents, and use the filters
 * fromBlock and toBlock to give Solidity a time range for the event logs
 * ("block" in this case referring to the Ethereum block number):
 * they cost gas, probs better to use a view to get your orders bills
 * */
cryptoZombies.getPastEvents("NewZombie", { fromBlock: 0, toBlock: "latest" })
    .then(function(events) {
        // `events` is an array of `event` objects that we can iterate, like we did above
        // This code will get us a list of every zombie that was ever created
    });

// listening to events fired from the contract
cryptoZombies.events.NewZombie()
    .on("data", function(event) {
        let zombie = event.returnValues;
        // We can access this event's 3 return values on the `event.returnValues` object:
        console.log("A new zombie was born!", zombie.zombieId, zombie.name, zombie.dna);
    }).on("error", console.error);

// Use `filter` to only fire this code when `_to` equals `userAccount`
cryptoZombies.events.Transfer({ filter: { _to: userAccount } })
    .on("data", function(event) {
        let data = event.returnValues;
        // The current user just received a zombie!
        // Do something here to update the UI to show it
    }).on("error", console.error);

function zombieToOwner(id) {
 //   return cryptoZombies.methods.zombieToOwner(id).call()
}

function getZombiesByOwner(owner) {
   // return cryptoZombies.methods.getZombiesByOwner(owner).call().then(displayZombies);
}

$(window).load(function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        let web3js = new Web3(web3.currentProvider);
    } else {
        // Handle the case where the user doesn't have web3. Probably
        // show them a message telling them to install Metamask in
        // order to use our app.
    }

    // Now you can start your app & access web3js freely:
    startApp();

});