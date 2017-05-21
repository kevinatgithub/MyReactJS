import React from 'react'

class Winner extends React.Component{

    render(){
        
        let {game,player} = this.props

        if(game.winner == 1){
            if(game.server == player){
                return (<h2 className="text-success">You Won!</h2>)
            }else{
                return (<h2 className="text-danger">You Loss!</h2>)
            }
        }else{
            if(game.server == player){
                return (<h2 className="text-danger">You Loss!</h2>)
            }else{
                return (<h2 className="text-success">You Won!</h2>)
            }
        }

    }
}

export default class TurnStatus extends React.Component{


    render(){
        
        let {game,player} = this.props,
            {winner,players} = game

        return (
            <div>
                {players.black && 
                    (
                        <div>
                        {game.winner ? 
                            (
                                <div>
                                    <Winner game={game} player={player} />
                                </div>
                            ) : (
                                <div>
                                    {game.turn == 1 ? 
                                    <i>White player turn</i> : <i>Black player turn</i>
                                    }
                                </div>
                            )
                        }
                        </div>
                    )
                }
            </div>
        )
    }
}