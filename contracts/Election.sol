// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

contract Election {
  // address public admin;
  uint256 candidateCount;
  uint256 voterCount;

  constructor() public {
    // admin = msg.sender;
    candidateCount = 0;
    voterCount = 0;
  }

  // modifier onlyAdmin() {
  //   require(msg.sender == admin);
  //   _;
  // }

  struct Candidate {
    uint256 candidateId;
    string name;
    uint256 voteCount;
  }

  mapping(uint256 => Candidate) public candidateDetails;

  function addCandidate(string memory _name) public {
    Candidate memory newCandidate =
      Candidate({
          candidateId: candidateCount,
          name: _name,
          voteCount: 0
      });
    candidateDetails[candidateCount] = newCandidate;
    candidateCount += 1;
  }

  function getCandidateNumber() public view returns (uint256) {
    return candidateCount;
  }
}
