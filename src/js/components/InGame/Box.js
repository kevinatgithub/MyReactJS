import React from 'react';

export default class Box extends React.Component{

    constructor(props){
        super(props);
    }
    

    drawPiece(){
        let type = "", side = "1", inselection = "";
        if(!this.props.piece){
            type = "";
        }else{
            let k = this.props.piece.split('');
            type = k[0];
            side = k[1];
            inselection = k[2];
        }

        if(side == 1){
            let classes = "swhite "+ (inselection && "in-selection");
            switch(type){
                case 'R':
                    return (<div class={classes}>&#9814;</div>);
                break;
                case 'X':
                    return (<div class={classes}>&#9816;</div>);
                break;
                case 'B':
                    return (<div class={classes}>&#9815;</div>);
                break;
                case 'Q':
                    return (<div class={classes}>&#9813;</div>);
                break;
                case 'K':
                    return (<div class={classes}>&#9812;</div>);
                break;
                case 'P':
                    return (<div class={classes}>&#9817;</div>);
                break;
                default:
                    return (<div>&nbsp;</div>);
                break;
            }
        }else{
            let classes = "sblack "+ (inselection && "in-selection");
            switch(type){
                case 'R':
                    return (<div class={classes}>&#9820;</div>);
                break;
                case 'X':
                    return (<div class={classes}>&#9822;</div>);
                break;
                case 'B':
                    return (<div class={classes}>&#9821;</div>);
                break;
                case 'Q':
                    return (<div class={classes}>&#9819;</div>);
                break;
                case 'K':
                    return (<div class={classes}>&#9818;</div>);
                break;
                case 'P':
                    return (<div class={classes}>&#9823;</div>);
                break;
                default:
                    return (<div></div>);
                break;
            }
        }
    }

    pieceMove(e){
        this.props.pieceMove(this)
    }
    
    render(){

        let classes = "box " + (this.props.boxType ? 'white' : 'green');

        return(
            <div class={classes} 
                 onClick={this.pieceMove.bind(this)} 
                 rowID={this.props.rowID} 
                 cellID={this.props.cellID}
                 piece={this.props.piece} >
                {this.drawPiece()}
            </div>
        );

    }
}