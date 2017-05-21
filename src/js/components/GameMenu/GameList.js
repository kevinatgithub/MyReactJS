import React from 'react'

export default class GameList extends React.Component{

    constructor(prop){
        super(prop)
        
    }

    render(){
        let {games} = this.props
        return(
            <div>
                <table className="table table-striped table-condensed">
                    <tbody>
                        {
                            _.reverse(games).map((game,i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {!game.players.black && 
                                                <i className="text-info">{game.players.white} is waiting for opponent</i>
                                            }
                                            {game.players.black &&
                                                <b className="text-success">{game.players.white} and {game.players.black} is playing</b>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}