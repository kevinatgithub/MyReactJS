import React from "react";
import SocketClient from "./SocketClient";
import CreateGame from "./GameMenu/CreateGame";
import GameList from './GameMenu/GameList';
import InGame from "./InGame/InGame";
import _ from "lodash";

export default class App extends React.Component {

  constructor(prop){
    super(prop);
    
    this.client = new SocketClient(this)

    this.state = {
      games : [], player : null, server : null
    }

    if(localStorage.getItem("player")){
      let player = localStorage.getItem("player"), game = localStorage.getItem("game")
      _.delay(()=>{
        this.startGame({player,game})
      },1000)
    }

  }

  startGame({player,game}){
    let {games} = this.state,
        dgame = games.find(g => g.server === game )
        
    let param = {name : player, game, newGame : game}
    if(dgame === undefined){
        // this.client.io.emit("game:create",param)
        localStorage.removeItem("player")
        localStorage.removeItem("game")
    }else{
        this.client.io.emit("game:join",param)    
    }
    this.gameSet(param)
  }

  gameSet(param){
    let {name,newGame,game} = param, dgame 

    _.delay(() => {
      dgame = _.find(this.state.games,{server : game})
      this.setState({player : name, game : dgame})
    },1000)
  }

  exitGame(){
    this.client.io.emit("game:quit",{game:this.state.game.server})
    this.setState({player:null,game:null})
  }

  render() {
    

    return (
      <div className="container padding-top">
        <div className="content">
          {!this.state.game && 
            <div>
              <div className="col-xs-4 col-xs-offset-2">
                <CreateGame socket={this.client} 
                            games={this.state.games} 
                            gameSet={this.gameSet.bind(this)} />
              </div>
              <div className="col-xs-4">
                  <GameList games={this.state.games} />
              </div>

            </div>
          }
          {this.state.game &&
            <InGame socket={this.client} 
                    game={this.state.game} 
                    player={this.state.player} 
                    exitGame={this.exitGame.bind(this)} />
          }
        </div>
      </div>
    );
  }
}
