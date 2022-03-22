class GetController {

// app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));

    home(req,res){
        res.sendFile(__dirname + '/index.html')
    }


}

module.exports = new GetController()