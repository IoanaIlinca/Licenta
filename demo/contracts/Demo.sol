pragma solidity >=0.4.22 <0.9.0;

contract Demo {
	uint public count = 20;

	// Function to get the current count
	function getCounter() public returns (uint) {
		return count;
	}

	// Function to increment count by 1
	function inc() public {
		count += 1;
	}

	// Function to decrement count by 1
	function dec() public {
		// This function will fail if count = 0
		count -= 1;
	}
}