// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WaveContract {
    uint256 totalWaves;

    uint256 private seed;

    event NewWave(
        address indexed from,
        uint256 timestamp,
        string message,
        bool hasWon
    );

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
        bool hasWon;
    }

    Wave[] waves;

    struct UserInfo {
        uint256 lastWavedAt;
        uint256 totalWaves;
    }

    // mapping(address => uint256) userWaveHistory;
    mapping(address => UserInfo) usersInfo;

    constructor() payable {
        console.log("Wave contract init");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(
            usersInfo[msg.sender].lastWavedAt + 30 seconds < block.timestamp,
            "Wait 15min"
        );
        console.log(
            "%s just waved at you ! She/he said : %s",
            msg.sender,
            _message
        );

        totalWaves += 1;
        usersInfo[msg.sender].totalWaves += 1;
        usersInfo[msg.sender].lastWavedAt = block.timestamp;
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        bool hasWon = seed <= 20;

        waves.push(Wave(msg.sender, _message, block.timestamp, hasWon));

        if (hasWon) {
            console.log("%s has won the prize !", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Sorry we're bankrupt !"
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "The transaction has failed");
        }

        emit NewWave(msg.sender, block.timestamp, _message, hasWon);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves !", totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getAddressInfos() public view returns (UserInfo memory) {
        return usersInfo[msg.sender];
    }
}
