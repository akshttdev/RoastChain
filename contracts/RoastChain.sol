// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RoastChain {
    struct Roast {
        uint256 id;
        address author;
        string content;
        uint256 votes;
        uint256 timestamp;
    }

    Roast[] public roasts;

    // Mapping: roastId => (user => hasVoted)
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event RoastSubmitted(uint256 indexed id, address indexed author, string content);
    event Voted(uint256 indexed id, address indexed voter, uint256 newVoteCount);

    function submitRoast(string calldata _content) external {
        uint256 newId = roasts.length;
        roasts.push(Roast({
            id: newId,
            author: msg.sender,
            content: _content,
            votes: 0,
            timestamp: block.timestamp
        }));

        emit RoastSubmitted(newId, msg.sender, _content);
    }

    function vote(uint256 _id) external {
        require(_id < roasts.length, "Roast does not exist");
        require(!hasVoted[_id][msg.sender], "Already voted on this roast");

        hasVoted[_id][msg.sender] = true;
        roasts[_id].votes += 1;

        emit Voted(_id, msg.sender, roasts[_id].votes);
    }

    function getAllRoasts() external view returns (Roast[] memory) {
        return roasts;
    }

    function getRoastsByAuthor(address _author) external view returns (Roast[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < roasts.length; i++) {
            if (roasts[i].author == _author) {
                count++;
            }
        }
        
        Roast[] memory result = new Roast[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < roasts.length; i++) {
            if (roasts[i].author == _author) {
                result[index] = roasts[i];
                index++;
            }
        }
        return result;
    }
}
