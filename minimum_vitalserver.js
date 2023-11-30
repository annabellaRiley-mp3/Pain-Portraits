// original file written by Hyung-Chul Lee (vital@snu.ac.kr)
// transformed by Annabella Riley
// Download minimum_vitalserver.js from the github repository.
// Please download and nodejs server (LTS version) from https://nodejs.org.
// In the folder containing minimum_vitalserver.js, run "npm install socket.io@2 express".
// Execute "node minimum_vitalserver.js".
// Allow access when the warning pops up.
// Please add "SERVER_IP=127.0.0.1:3000" to vr.conf.
// Run Vital Recorder and Add Device (eg. Demo)
// Open the browser and connect to "http://localhost:3000".
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    //maxHttpBufferSize: 1e8 // buffer size
});
const zlib = require('zlib');
const emitRow = require('./csvData');

app.use(express.static('public'));

const isDebugMode = false;

app.get('/', (req, res) => {
    res.send(`
        <script src="/socket.io/socket.io.js"></script>
        <link rel="stylesheet" href="/styles.css">
        <body>
            <button id='modeButton' onclick='changeMode()' style='display: ${isDebugMode ? 'block' : 'none'}'>live</button>

            <div id="fps"></div>
            <div id="base1"></div>
            <div id="base2"></div>
            <div id="scribble"></div>     
            <div id="miasma"></div>      
            <div id="comet"></div>
      
            <div class="dataContainer" id="annabella">
                <div id="myPLETH" class="flexItem separator pleth">PLETH: ---</div>
                <div id="myHR" class="flexItem separator hr">HR: ---</div>
                <div id="myPLETH_SPO2" class="flexItem separator plethspo2">PLETH_SPO2: ---</div>
                <div id="myPLETH_HR" class="flexItem plethhr">PLETH_HR: ---</div>
            </div> 

            <div class="dataContainer offset" id="user">
                <div id="PLETH" class="flexItem separator pleth">PLETH: ---</div>
                <div id="HR" class="flexItem separator hr">HR: ---</div>
                <div id="PLETH_SPO2" class="flexItem separator plethspo2">PLETH_SPO2: ---</div>
                <div id="PLETH_HR" class="flexItem plethhr">PLETH_HR: ---</div>
            </div>
        </body>
        <script>
            var mode = 'live';
            var modes = ['live', 'ultra low', 'low', 'medium', 'high'];

            function changeMode() {
                button = document.getElementById('modeButton');
                prevMode = button.innerHTML;
                mode = modes[(modes.indexOf(prevMode) + 1) % modes.length];
                button.innerHTML = mode;
            }
        </script>
        <script src="https://cdn.jsdelivr.net/npm/tsparticles@1.29.0/dist/tsparticles.min.js"></script>
        <script src="logic.js"></script>
        `
    );
});

io.on('connection', (socket) => {
    console.log(`connect ${socket.id}`);
    socket.on("disconnect", (reason) => {
      console.log(`disconned ${socket.id} due to ${reason}`);
    });
    socket.on("send_data", data => {
        console.log("data received");
        try{
            var z1 = zlib.inflateSync(Buffer.from(data, 'binary')).toString();
            z1.replace('/[\x00-\x1F\x7F]/u', '');
            z1.replace('nan', '""');
            var json = JSON.parse(z1);
            socket.broadcast.emit('send_data', json);
        } catch(err){
            console.log("send_data ERROR", err, data);
        }
    });
    setInterval(() => {
        emitRow(socket);
    }, 1000);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});