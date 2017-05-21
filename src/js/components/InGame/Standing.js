import React from "react"

class StandingBox extends React.Component{

    render(){
        let {pieces} = this.props

        return(
            <div class="text-info">
                <small>
                    King : {pieces.K} &nbsp;&nbsp; 
                    Queen : {pieces.Q} &nbsp;&nbsp; 
                    Bishop : {pieces.B} &nbsp;&nbsp; 
                    Knight : {pieces.X} &nbsp;&nbsp;
                    Rook : {pieces.R} &nbsp;&nbsp; 
                    Pawn : {pieces.P}
                </small>
            </div>
        )
    }
}

export default class Standing extends React.Component{

    render(){

        let {pieces} = this.props, 
            standing = { 
                white : {R:0, X:0, B:0, Q:0, K:0, P:0} , 
                black : {R:0, X:0, B:0, Q:0, K:0, P:0} 
            }

        pieces.forEach((rowPieces,i) => {
            rowPieces.forEach((piece,x) => {
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

        return(
            <div>
                <div> White <StandingBox pieces={standing.white} /></div>
                <div> Black <StandingBox pieces={standing.black} /></div>
            </div>
        )
    }
}