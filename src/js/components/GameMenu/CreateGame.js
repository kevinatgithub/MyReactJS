import React from 'react'
import _ from 'lodash'

export default class CreateGame extends React.Component{

    constructor(prop){
        super(prop)

        this.state = {
            name : "", game : "-Create Game-", nameExisting : false
        }
    }

    nameChange({target : {value }}){
        let {games} = this.props, {nameExisting} = this.state
        
        nameExisting = games.find(g => g.server.toUpperCase() === value.toUpperCase() )
        
        this.setState({name : value, nameExisting})
    }

    gameChange({target : {value}}){
        this.setState({game : value})
    }

    handleClick(e){
        let name = this.state.name,
            game = this.state.game == "-Create Game-" ? this.state.name : this.state.game,
            newGame = this.state.game == "-Create Game-",
            param = {name,game,newGame}

        localStorage.setItem("player",name)
        localStorage.setItem("game",game)
        
        let {socket,gameSet} = this.props

        if(newGame){
            socket.io.emit("game:create",param)
        }else{
            socket.io.emit("game:join",param)    
        }
        gameSet(param)
    }
    
    render(){
        let games = ["-Create Game-"]
        this.props.games.map((game) => { 
            if(!game.players.black){
                games.push(game) 
            }
        })
        return(
            <div className="form-horizontal">
                <div className="input-group">
                    <div className="input-group-addon">
                        <span>Your Name</span>
                    </div>
                    <input className="form-control" value={this.state.name} onChange={this.nameChange.bind(this)} />
                </div>
                <br/>
                <div className="input-group">
                    <div className="input-group-addon">
                        <span>Join Game</span>
                    </div>
                    <select className="form-control" value={this.state.game} onChange={this.gameChange.bind(this)}>
                        {
                            games.map((game,i) => {
                                return (<option key={i}>{game.server}</option>)
                            })
                        }
                    </select>
                </div>
                <br/>
                <button className="btn btn-success btn-xs" onClick={this.handleClick.bind(this)} disabled={!(this.state.name && !this.state.nameExisting)} >
                    {this.state.game == "-Create Game-" ? "Create" : "Join"}
                </button>
                <span className="pull-right">
                    {this.state.nameExisting && <div className="text-danger">Name Already Exists</div>}
                </span>
                
            </div>
        )
    }
}