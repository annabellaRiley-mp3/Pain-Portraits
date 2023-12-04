import debugData from './debugData.js';
import { blurOptions, blurUpdate } from './blurOptions.js';
import { baseOptions, baseUpdate } from './baseOptions.js';
import { scribbleOptions, scribbleUpdate } from './scribbleOptions.js';
import { cometOptions, cometUpdate } from './cometOptions.js';
import { polygonOptions, polygonUpdate } from './polygonOptions.js';
import { burstOptions } from './burstOptions.js';

const trackNames = ['PLETH', 'HR', 'PLETH_SPO2', 'PLETH_HR'];
var liveData = { Time: "137.58", PLETH: "7.28", HR: "64.907364", PLETH_SPO2: "100", PLETH_HR: "64.907364", SPI: "0", SPV: "0", PPV: "0" };
var isLive = false;

//format data to 2 dec pl
function format(value) {
   return (Number(parseFloat(value))).toFixed(2);
}

//handle live incoming data
io().on('send_data', (data) => {
    var rooms = data['rooms'];
    var trks = rooms[0]['trks'];
    var trackName;
    var trackValue;

    for (var i in trks) {
        if (trks[i].recs.length > 0) {
            trackName = trks[i].name;
            trackValue = '' + trks[i].recs[0].val;

            if (trackName === 'PLETH') {
                if (trackValue !== '') {
                    document.getElementById("user").style.display = "flex";
                    if (!isLive) { document.getElementsByClassName('colorFilter')[0].style.filter = 'saturate(500%) hue-rotate(' + (Math.floor(Math.random() * 86)) + 'deg)'; }
                    isLive = true;
                    //if (i === '13') {}
                } else {
                    document.getElementById("user").style.display = "none";
                    if (isLive) { document.getElementsByClassName('colorFilter')[0].style.filter = 'saturate(100%) hue-rotate(0deg)'; }
                    isLive = false;
                    //if (i === '13') {}
                }
            }

            //format data
            if (trackName === 'PLETH') {
                trackValue = trackValue.split(',')[0];
            }
            trackValue = format(trackValue);

            //set data
            if (trackNames.includes(trackName)) {
                document.getElementById(trackName).innerHTML = trackName + ': ' + trackValue;
            }
            if (isLive) {
                liveData[trackName] = trackValue;
            }
        }
    }
});

//handle auto csv data
io().on('csv_data', (data) => {
    if (isLive === false) {
        var mode = document.getElementById('modeButton').innerHTML;
        if (mode === 'live') {
            liveData = data;
        } else {
            liveData = debugData[mode];
        }
    }

    var trackValue;
    for (const trackName of trackNames) {
        trackValue = liveData[trackName];

        //format data
        trackValue = format(trackValue);
        document.getElementById('my' + trackName).innerHTML = trackName + ': ' + trackValue;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////
var blur1;
var blur2;

var base1;
var base2;

var layer1;
var layer2;
var layer3;
var layer4;

window.onload = function() {
    init();
}

async function init() {
    blur1 = await tsParticles.load("blur1", blurOptions);
    blur2 = await tsParticles.load("blur2", blurOptions);
    mobiusLoop(blur1, blur2, "blurEmitter", blurUpdate);

    base1 = await tsParticles.load("base1", baseOptions);
    base2 = await tsParticles.load("base2", baseOptions);
    mobiusLoop(base1, base2, "baseEmitter", baseUpdate);

    layer1 = await tsParticles.load("layer1", scribbleOptions);
    simpleLoop(layer1, scribbleUpdate);

    layer2 = await tsParticles.load("layer2", cometOptions);
    continuous(layer2, "cometEmitter", cometUpdate, 75);

    layer3 = await tsParticles.load("layer3", polygonOptions);
    simpleLoop(layer3, polygonUpdate);
    
    layer4 = await tsParticles.load("layer4", burstOptions);
}


//restarts emitter - no/stuttered transition
function simpleLoop(animationInstance, updateFunction, delay) {
    updateFunction(animationInstance, liveData);
    animationInstance.refresh().then(() => {
        setTimeout(() => {simpleLoop(animationInstance, updateFunction)}, (liveData['HR'] * 20));
    });
}

//refreshes 2 emitters asynchronously - seamless transition
function mobiusLoop(animationInstance1, animationInstance2, emitterName, updateFunction) {
    animationInstance1.pauseEmitter(emitterName);

    updateFunction(animationInstance2, liveData);
    animationInstance2.refresh().then(() => {
        animationInstance2.playEmitter(emitterName);
        setTimeout(() => {mobiusLoop(animationInstance2, animationInstance1, emitterName, updateFunction)}, 2000);
    });
}

//refreshes/reveals/hides emitter around limit value
let opacityFilter = document.getElementsByClassName('opacityFilter')[0];
function continuous(animationInstance, emitterName, updateFunction, limit) {
    // delayed emission pause
    animationInstance.pauseEmitter(emitterName);
    
    setTimeout(() => {
        if (liveData['HR'] > limit && window.getComputedStyle(opacityFilter).opacity === '0') {
            updateFunction(animationInstance, liveData);
            animationInstance.refresh().then(() => {
                opacityFilter.style.opacity = '1';
            });
        } else if (liveData['HR'] < limit && window.getComputedStyle(opacityFilter).opacity === '1') {
            opacityFilter.style.opacity = '0';
            animationInstance.stop();
        }
        continuous(animationInstance, emitterName, updateFunction, limit);
    }, 2000);
}
