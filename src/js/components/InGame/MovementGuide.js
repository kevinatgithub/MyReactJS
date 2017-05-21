export default class MovementGuide{

    static checkMoveValidity(param){
        let {current} = param

        switch(current.piece){
            case 'K':
                return MovementGuide.king(param);
            break;
            case 'Q':
                return MovementGuide.queen(param);
            break;
            case 'R':
                return MovementGuide.rook(param);
            break;
            case 'B':
                return MovementGuide.bishop(param);
            break;
            case 'X':
                return MovementGuide.knight(param);
            break;
            case 'P':
                return MovementGuide.pawn(param);
            break;
        }
    }

    static willCollide(current,target,pieces){
        let r1 = current.rowID, r2 = target.rowID,
            c1 = current.cellID, c2 = target.cellID,
            collision = false;
        
        if(r1 == r2){
            if(c1 < c2){
                do{
                    collision = pieces[r1][c1] ? true:false;
                    c1++;
                }while(c1<c2);
            }else if(c1 > c2){
                do{
                    collision = pieces[r1][c1] ? true:false;
                    c--;
                }while(c1>c2);
            }
        }else if(c1 == c2){
            if(r1 < r2){
                do{
                    collision = pieces[r1][c1] ? true:false;
                }while(r1<r2);
            }else if(r1 > r2){
                do{
                    collision = pieces[r1][c1] ? true:false;
                }while(r1 > r2);
            }
        }
        return collision;
    }

    static isValidDiagonal(param){
        let {r1,c1,r2,c2} = this.prepareCoordinates(param)

        if(r1 == r2){
            return true;
        }
        
        let rowID = r1 - r2, 
            x1 = c1 + rowID, 
            x2 = c1 + (rowID * -1)

        return (c2 == x1 || c2 == x2) ? true : false;
    }

    static king(param){
        let {r1,c1,r2,c2} = this.prepareCoordinates(param);

        if(this.knight(param)){
            return false;
        }

        if(((r1 + 1) == r2 || (r1 - 1) == r2) || ((c1 + 1) == c2  || (c1 - 1) == c2)){
            return true;
        }
        
        return false;
    }

    static queen(param){

        let {r1,c1,r2,c2} = this.prepareCoordinates(param)

        if(r1 == r2 || c1 == c2){
            return true;
        }else if(MovementGuide.isValidDiagonal(param)){
            return true;
        }
        return false;
    }
    
    static rook(param){
        let {r1,c1,r2,c2} = this.prepareCoordinates(param)

        if(r1 == r2 && c1 == c2){
            return false;
        }

        if(r1 == r2 || c1 == c2){
            return true;
        }

        return false;
    }

    static bishop(param){
        let {r1,c1,r2,c2} = this.prepareCoordinates(param)

        if(r1 == r2){
            return false;
        }
        if(MovementGuide.isValidDiagonal(param)){
            return true;
        }
        return false;
    }

    static knight(param){
        let {r1,c1,r2,c2} = this.prepareCoordinates(param);
        
        if((r1-1) == r2 || (r1+1) == r2){
            if(c1 - 2 == c2 || c1 + 2 == c2){
                return true;
            }
            return false;
        }else if((c1+1) == c2 || (c1-1) == c2){
            if(r1 - 2 == r2 || r1 + 2 == r2){
                return true;
            }
            return false;
        }
        return false;
    }

    static pawn(param){

        let {current,target,side,freshPawns} = param,
            {r1,c1,r2,c2} = this.prepareCoordinates(param),
            fresh = freshPawns.find((p)=>{
                return p[0] == r1 && p[1] == c1
            });

        if(!target.piece && c1 != c2){
            return false;
        }

        if(side == 1){
            if((r1 + 1) == r2){
                return true;
            }else if(fresh && (r1 + 2) == r2){
                return true;
            }
        }else if(side == 2){
            if((r1 - 1) == r2){
                return true;
            }else if(fresh && (r1 - 2) == r2){
                return true;
            }
        }
        return false;
    }

    static prepareCoordinates(param){
        let {current,target} = param,
            r1 = current.rowID, 
            c1 = current.cellID,
            r2 = target.rowID,
            c2 = target.cellID
        
        return {r1,c1,r2,c2}
    }
}