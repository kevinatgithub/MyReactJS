import React from "react";

import Row from './Row';
import Guide from './MovementGuide';


export default class Board extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      current : null
    }
  }

  notPlayersTurn(){
    let {player,game : {turn,server}} = this.props
    if((turn == 1 && player != server) || (turn == 2 && player == server)){
      return true
    }
    return false
  }
  
  pieceMove(e){
    
    if(this.notPlayersTurn()){
      return
    }

    if(this.props.game.winner){
      return
    }
    
    if(this.state.current){
      return this.executeMove(e);
    }else if(!e.props.piece){
      return true;
    }

    let {player,game : {server,pieces}} = this.props, 
        {rowID,cellID} = e.props,
        piece =  pieces[rowID][cellID].split(''),
        current = {rowID,cellID,piece : piece[0], type : piece[1]};
    
    // Check if piece selected belongs to player
    if(piece[1] == 1 && server != player){
        return false
    }else if(piece[1] == 2 && server == player){
        return false
    }
    
    pieces[rowID][cellID] = pieces[rowID][cellID] + "X";

    this.setState({ pieces, current });
    // this.props.pieceMoved(pieces)
  }

  executeMove(e){
    let {rowID,cellID,piece} = e.props,
        {pieces,current,white,black} = this.state,
        {game : {history,freshPawns}} = this.props;

    

    if(rowID == current.rowID && cellID == current.cellID){
      pieces[rowID][cellID] = current.piece+current.type;
      this.setState({pieces, current:null});
    }
    
    let isValid = Guide.checkMoveValidity({
        current,
        target : {rowID,cellID,piece},
        side : current.type,
        freshPawns
    });
    
    if(!isValid){
      return true;
    }else if(piece){
      pieces[rowID][cellID] = '';
      this.setState({pieces, current : null});
      // this.logScore();
    }
    
    pieces[rowID][cellID] = current.piece + current.type;
    pieces[current.rowID][current.cellID] = null;
    
    // mark pawn (if it is) as touched
    let fresh = freshPawns.findIndex((p) => {
      return p[0] == current.rowID && p[1] == current.cellID
    })
    
    if(fresh !== undefined){
      freshPawns.splice(fresh,1)
    }
    // end mark
    
    this.setState({pieces, current : null, freshPawns});
    this.props.pieceMoved(pieces,freshPawns)
      
  }

  logScore(){
    let R = 0,X = 0,B = 0,Q = 0,K = 0,P = 0;
    let scores = { white : {R,X,B,Q,K,P} , black : {R,X,B,Q,K,P} } , all = this.state.pieces;
    all.forEach((r) => {
      r.forEach((s) => {
        if(s){
          let parts = s.split('');
          if(parts[1] == 1){
            scores.white[parts[0]] = (scores.white[parts[0]] * 1) + 1;
          }else{
            scores.black[parts[0]] = (scores.black[parts[0]] * 1) + 1;
          }
        }
        
      });
    });
    console.log(scores);
  }

  render() {
    
    let {player,game : {players,server,pieces}} = this.props, rows = [];

    if(!players.black){
        pieces = [[],[],[],[],[],[],[],[]]
    }

    for (let i = 0; i < 8; i++) {
        rows.push(<Row key={i} 
                       rowType={i%2} 
                       pieces={pieces[i]} 
                       pieceMove={this.pieceMove.bind(this)} 
                       rowID={i} />)
    }
    
    return (
      <div>
        <div class="board">
          {rows}
        </div>
      </div>
    );
  }
}
