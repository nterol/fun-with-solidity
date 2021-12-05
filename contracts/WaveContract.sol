// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WaveContract {

uint totalWaves;
address owner;

struct Wave {
    uint totalWave;
    uint timeStamp;
}

mapping(address => Wave) public allWaves;

    constructor() {
        owner = msg.sender;
        console.log("Hello, I am Wave contract");
        
    }

    function wave() public {
        console.log(" %s just waved at you !", msg.sender);
        totalWaves += 1;
        Wave storage currentWave = allWaves[msg.sender];
        currentWave.totalWave+= 1;
        currentWave.timeStamp = block.timestamp;
    }


    function getTotalWaves() public view returns (uint) { 
        console.log("We have %d total waves !", totalWaves);
        return totalWaves;
    }

    function getAddressInfos() public view returns (uint totalWave, uint timeStamp) {
        Wave memory currentWave = allWaves[msg.sender];
        return (currentWave.totalWave, currentWave.timeStamp);
    }
}
