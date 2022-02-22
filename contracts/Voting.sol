// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

// CHS
contract Voting{
    // uint256 candidateCount
    uint256 candidateCount;

    // uint256 voterCount
    uint256 voterCount;

    address public ballotOfficialAddress;
    string public ballotOfficialName;
    string public proposal;


    mapping (address => uint256) public candidate;
    mapping (address => bool) public votetest;

    // constructor()
    constructor(
        string memory _ballotOfficialName,
        string memory _proposal
    )
    public
    {
        candidateCount = 0;
        voterCount = 0;
        votetest[msg.sender] = false;
        ballotOfficialAddress = msg.sender;
        ballotOfficialName = _ballotOfficialName;
        proposal = _proposal;

        state = State.Created;
    }

    // VARIABLES
    // struct Voter { address voterAddress; bool hasVoted; }
    struct Voter {
        address voterAddress;
        bool hasVoted;
    }

    // struct Candidate { uint256 candidateId; string name; uint256 voteCount; }
    struct Candidate {
        uint256 candidateId;
        string name;
        string slogan;
        uint256 voteCount;
    }

    // enum State { Created, Voting, Ended }
    enum State { 
        Created,
        Voting,
        Ended
    }
    State public state;

    // mapping (uint256 => Candidate) candidateDetails;
    mapping(uint256 => Candidate) public candidateDetails;
    
    // mapping (address=>bool) hasVoted;
    /* mapping (address => bool) public hasVoted; */

    /* MODIFIERS */
    // modifier onlyCandidater()
    modifier onlyCandidater(){
        require(candidate[msg.sender] < 1);
        _;
    }

    // modifier inState()
    modifier inState(State _state){
        require(state == _state);
        _;
    }

    /* FUNCTIONS */
    // addCandidate()
    function addCandidate(string memory _name, string memory _slogan) public onlyCandidater {
        require(candidateCount < 5);
        Candidate memory newCandidate =
            Candidate({
                candidateId: candidateCount,
                name: _name,
                slogan: _slogan,
                voteCount: 0
            });
        candidateDetails[candidateCount] = newCandidate;
        candidateCount += 1;
        candidate[msg.sender]++;
    }

    // getCandidateNumber()
    function getCandidateNumber() public view returns (uint256) {
        return candidateCount;
    }

    // Vote()
    function vote(uint256 candidateId) public {
        require(votetest[msg.sender] == false);
        // require(start == true);
        // require(end == false);
        candidateDetails[candidateId].voteCount += 1;
        votetest[msg.sender] = true;
    }
    // endVote()
}