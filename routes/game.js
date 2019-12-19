_ = require("lodash");

module.exports = io => {

// Sockets.io
let rooms = [];

let id = 0;

io.on('connection', socket=>{

    let room = {};
    
    socket.on("newGame", user=>{

        if(_.find(rooms, {players: [{id: user._id}]})){
            room = _.find(rooms, {players: [{id: user._id}]});
        }else{
            room.id = id;
            id++;

            room.turn=1;
            room.status="Action Picking";
            
            room.monsters=[];
            room.monsters.push({name: "slime", hp: 100, maxhp: 100, actions:[{name: "Strike", type: "Physical", value: 2, target: 1, tempo: 23}]})
            room.monsters.push({name: "slime", hp: 100, maxhp: 100, actions:[{name: "Strike", type: "Physical", value: 2, target: 1, tempo: 23}]})
    
            room.players=[];

            let hand = [user.deck[Math.floor(Math.random() * user.deck.length)],
                user.deck[Math.floor(Math.random() * user.deck.length)],
                user.deck[Math.floor(Math.random() * user.deck.length)],
                user.deck[Math.floor(Math.random() * user.deck.length)],
                user.deck[Math.floor(Math.random() * user.deck.length)]
            ];

            room.players.push({id: user._id, name: user.name, lvl: user.lvl, deck: user.deck, hand, items: user.items, hp: 100, maxhp: 100, mana: 3, maxmana: 3});
            rooms.push(room);
        }

        socket.join(room.id); 
    });

    socket.on("roomStatus", () => {
        room = rooms[room.id];
        room.timer
        io.to(room.id).emit("roomStatus", room)
    })

    socket.on("disconnect", ()=>{
        
    })
});

}
