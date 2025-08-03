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
    const emptyRound = (count, title) => ({
        title,
        seeds: Array.from({ length: count }, (_, i) => ({
            id: `${title.toLowerCase().replace(/\s/g, "-")}-match-${i + 1}`,
            teams: [
                { id: `empty-${i * 2 + 1}`, name: "" },
                { id: `empty-${i * 2 + 2}`, name: "" }
            ]
        }))
    });

    return [
        {
            title: "Round of 32",
            seeds
        },
        emptyRound(8, "Round of 16"),
        emptyRound(4, "Quarterfinals"),
        emptyRound(2, "Semifinals"),
        emptyRound(1, "Final")
    ];
};

export default buildInitialRounds;