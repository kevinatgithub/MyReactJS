var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');
var port = 3000;
var games = [];
var pieces = [
      ['R1','X1','B1','Q1','K1','B1','X1','R1'],
      ['P1','P1','P1','P1','P1','P1','P1','P1'],
      [],[],[],[],
      ['P2','P2','P2','P2','P2','P2','P2','P2'],
      ['R2','X2','B2','K2','Q2','B2','X2','R2']
    ];
var freshPawns = [
      [1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],
      [6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]
    ];

io.on('connection',function(socket){
    io.emit("connected",{port,games})

    socket.on("game:create",function(p){
        games.push({
            server : p.name,
            players : {
                white : p.name, black : null
            },
            pieces : pieces,
            freshPawns : freshPawns,
            turn : 1, history : []
        })
        io.emit("connected",{port,games})
    })

    socket.on("game:join",function(p){
        var game = games.find(g => g.server === p.game)
        if(game){
            if(p.name == p.game){
                game.players.white = p.name;
            }else{
                game.players.black = p.name;
            }
            var gameIndex = games.findIndex(g => g.server === p.game )
            games[gameIndex] = game;
            io.emit("connected",{port,games})
        }
        // socket.broadcast.emit("connected",{port,games});
    })

    socket.on("game:playerMoved",function(param){
        p = param.game
        f = param.freshPawns
        var gameIndex = games.findIndex(g => g.server === p.server )
        p.history.push(p.pieces)
        games[gameIndex].history = p.history
        games[gameIndex].pieces = p.pieces
        games[gameIndex].freshPawns = f
        games[gameIndex].turn = games[gameIndex].turn == 1 ? 2 : 1;
        games[gameIndex].winner = checkForWinner(param)
        io.emit("connected",{port,games})
    })

    socket.on("game:quit",function(p){
        var newGames = []
        games.forEach(function(game){
            if(game.server.toUpperCase() != p.game.toUpperCase()){
                newGames.push(game)
            }
        })
        games = newGames
        io.emit("connected",{port,games})
    })

    socket.on("disconnect",function(p){
        if(!p.game){
            return;
        }
        _.remove(games,{server:p.game.server});
        io.emit("connected",{port,games})
    })
});

http.listen(port,function(){
    console.log('listening on *: ' + port);
});

function checkForWinner(param){
    var pieces = param.game.pieces, 
        standing = { 
            white : {R:0, X:0, B:0, Q:0, K:0, P:0} , 
            black : {R:0, X:0, B:0, Q:0, K:0, P:0} 
        }

    pieces.forEach(function(rowPieces,i){
        rowPieces.forEach(function(piece,x){
            if(piece != null){
                piece.split("")
                if(piece[1] == 1){
                    standing.white[piece[0]]++;
                }else{
                    standing.black[piece[0]]++;
                }
            }
        })
    })

    if(standing.black.K == 0){
        return 1
    }else if(standing.white.K == 0){
        return 2
    }
    return null
}