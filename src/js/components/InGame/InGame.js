import React from 'react'
import Board from './Board'
import TurnStatus from './TurnStatus'
import Standing from './Standing'

export default class InGame extends React.Component{

    cancelGame(e){
        e.preventDefault()
        localStorage.removeItem("player")
        localStorage.removeItem("game")
        this.props.exitGame()
    }

    pieceMoved(pieces,freshPawns){
        let {socket,game} = this.props
        game.pieces = pieces
        socket.io.emit("game:playerMoved",{game,freshPawns})
    }

    render(){
        let {game,player} = this.props,
            {players,pieces} = game,
            {white,black} = players
        
        return (
            <div className="row">
                <div className="col-lg-6">
                    <div className="board">
                        {<Board player={player} 
                                game={game} 
                                pieceMoved={this.pieceMoved.bind(this)} />}
                    </div>
                </div>
                <div className="col-lg-6">
                    {black ? 
                        <i>{white} (White) is playing with {black} (Black) </i> :
                        <i>{white} is waiting for opponent </i>
                    }<br/>
                    <a href="#" onClick={this.cancelGame.bind(this)}>Quit</a><br/>
                    <br/>
                    <TurnStatus player={player} game={game} />
                    <br/><br/>
                    <b>Standing</b>
                    <Standing pieces={pieces} />
                </div>
                
            </div>
        )
    }
}