export default class SocketClient{

    constructor(app){
        this.app = app
        this.wsURI = "http://localhost:3000"


        this.io = io(this.wsURI)
        this.connected = this.connected.bind(this)
        this.io.on('connected',this.connected);
        this.io.on('game:update',this.update);

    }

    connected(data){
        // console.log("connected to " + data.port)
        let games = data.games ? data.games : [],
            game = null
        if(localStorage.getItem("game")){
            game = games.find(g => g.server === localStorage.getItem("game"))
        }
        this.app.setState({games,game})       
    }
}