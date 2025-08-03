const buildInitialRounds = (players) => {
    const rounds = [];
    const seeds =[];
    const len = players.length;
    // build the seeds
    for (let i = 0; i<len; i+=2){
        seeds.push({
            id: `match-${(i/2)+1}`,
            teams: [
                {id: `player-${i+1}`, name:players[i]},
                {id: `player-${i+2}`, name:players[i+1]},
            ]
        })
    }
    console.log("len is " , len);
    console.log("players are" , players);

    const roundTitle = {
        2: "Final",
        4: "Semi Final",
        8: "Quarter Final",
        16: "Round of 16",
        32: "Round of 32"
    }[len] || `Round of ${len}`;

    rounds.push({ title: roundTitle, seeds });
    console.log("rounds", rounds);
    return rounds;
};

export default buildInitialRounds;