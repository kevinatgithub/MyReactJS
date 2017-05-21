import React from 'react';

import Box from './Box';

export default class Row extends React.Component{

    constructor(props){
        super(props);
     
    }


    boxes(){
        let boxes = [];
        
        let count = this.props.rowType ? 9 : 8;
        let x = 0;
        for(let i = this.props.rowType, z = 0; i < count; i++){
            let boxType = i%2 == 0;
            boxes.push(<Box key={i} 
                            boxType={boxType} 
                            piece={this.props.pieces[x]} 
                            pieceMove={this.props.pieceMove} 
                            rowID={this.props.rowID} 
                            cellID={z} ></Box>);
            x++;
            z++;
        }
        return boxes;
    }
    
    render(){
        return (
            <div class="row">
                {this.boxes()}
            </div>
        );
    }
}