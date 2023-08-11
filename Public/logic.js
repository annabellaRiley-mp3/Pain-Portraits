const trackNames = ['PLETH', 'HR', 'PLETH_SPO2', 'PLETH_HR'];
var isLive = false;
var liveData = { Time: "137.58", PLETH: "7.28", HR: "64.907364", PLETH_SPO2: "100", PLETH_HR: "64.907364", SPI: "0", SPV: "0", PPV: "0" };

function format(value) {
   return (Number(parseFloat(value))).toFixed(2);
}

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
                    if (i === '13') {
                        isLive = true;
                    }
                } else {
                    document.getElementById("user").style.display = "none";
                    if (i === '13') {
                        isLive = false;
                    }
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

io().on('csv_data', (data) => {
    if (!isLive) {
        liveData = data;
    }

    var trackValue;
    for (const trackName of trackNames) {
        trackValue = data[trackName];

        //format data
        trackValue = format(trackValue);
        document.getElementById('my' + trackName).innerHTML = trackName + ': ' + trackValue;
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////
var scribbleContainer;
var baseContainer1;
var baseContainer2;
var fpsContainer;
var miasmaContainer;
var cometContainer;

window.onload = function() {
    init();
}

async function init() {
    baseContainer1 = await tsParticles.load("baseParticles1", baseOptions);
    baseContainer2 = await tsParticles.load("baseParticles2", baseOptions);
    pause();
    fpsContainer = await tsParticles.load("fps", fpsScribble)//FIX
    depContinuous();
    scribbleContainer = await tsParticles.load("scribble", scribble);
    continuous();
    miasmaContainer = await tsParticles.load("miasma", miasma);
    cometContainer = await tsParticles.load("comet", basest);
}

function getRandomColour() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const depContinuous = () => {
    fpsUpdate(fpsContainer);
    fpsContainer.refresh();
    setTimeout(depContinuous, (liveData['HR'] * 100));
}

function fpsUpdate(container) {
    container.options.emitters.rate.delay.max = 300 - (liveData['HR'] * 2);
    container.options.particles.color.animation.l.max = Math.max((liveData['HR'] * 2), 70);
    container.options.particles.line_linked.triangles.opacity = (liveData['PLETH_HR'] / 100);

    container.options.emitters.rate.quantity = (liveData['PLETH_HR'] / 10);
    container.options.particles.line_linked.distance = (liveData['HR']) + 85;
    if (isLive) {
        container.options.particles.line_linked.triangles.color = "random";
    } else { 
        container.options.particles.line_linked.triangles.color = "#2e3854";
    }
}

const continuous = () => {
    scribbleUpdate(scribbleContainer);
    scribbleContainer.refresh();
    setTimeout(continuous, 2000);
}

function scribbleUpdate(container) {
    container.options.particles.opacity.value = 1 - (liveData['PLETH_SPO2'] / 150) + (liveData['HR'] / 150)
    container.options.particles.line_linked.distance = 20 + Math.pow((liveData['PLETH_HR'] - 50) / 50, 2) * 100;
    container.options.particles.line_linked.opacity = 1 - (liveData['PLETH_HR'] / 300);
    container.options.particles.line_linked.triangles.opacity = Math.abs(liveData['PLETH']) / 50;

    container.options.emitters[0].rate.quantity = Math.min(Math.abs(liveData['PLETH']), 10);
}

const play = () => {
    baseContainer2.pauseEmitter("baseEmitter");
    //update values
    baseUpdate(baseContainer1);
    baseContainer1.refresh().then(() => {
        baseContainer1.playEmitter("baseEmitter");
    });
    setTimeout(pause, 2000);
}

const pause = () => {
    baseContainer1.pauseEmitter("baseEmitter");
    //update values
    baseUpdate(baseContainer2);
    baseContainer2.refresh().then(() => {
        baseContainer2.playEmitter("baseEmitter");
    });
    setTimeout(play, 2000);
}

function baseUpdate(container) {
    container.options.particles.opacity.animation.speed = liveData['HR']/20;
    container.options.particles.move.speed.max = (liveData['PLETH_HR'] - 40) * (1 - 0.5) / (130 - 40) + 0.5;
    container.options.particles.move.speed.min = ((liveData['PLETH_HR'] - 40) * (1 - 0.5) / (130 - 40) + 0.5) / 2;
    //container.options.particles.opacity.value = liveData['HR'] / 100 + 0.1;
    container.options.particles.life.duration.min = liveData['HR'] / 10;
    
}


const miasma = {
    fpsLimit: 60,
    particles: {
        number: {
        value: 0,
        density: {
            enable: true,
            value_area: 800
        }
        },
        color: {
            value: "#65686c",
            animation: {
                enable: true,
                speed: 90,
                sync: true,
            }
        },
        shape: {
        type: "circle",
        stroke: {
            width: 0,
            color: "#65686c"
        },
        polygon: {
            nb_sides: 5
        },
        },
        opacity: {
            value: 0.1,
            random: false,
        },
        size: {
        value: 0,
        random: false,
        anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
        }
        },
        line_linked: {
            enable: true,
            distance: 110,
            color: "#65686c",
            opacity: 0.5,
            width: 2
        },
        move: {
            enable: true,
            speed: 30,
            direction: "none",
            random: true,
            straight: false,
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            },
            outModes: {
                default: "destroy",
            },
        }    
    },
    emitters: {
        name: "lowfpsEmitter",
        direction: "none",
        rate: {
          quantity: 40,  // TIE?
          delay: { min: 5, max: 30 }  //TIE
        },
        size: {
          width: 20,
          height: 20
        },
        position: {
          x: 65,
          y: 45
        },
    },
    retina_detect: true
}

const scribble = {
    fpsLimit: 60,
    fullScreen: {
        enable: true
    },
    zIndex: 5,
    particles: {
        number: {
          value: 0,
          zIndex: 1
        },
        color: {
            value: "#f76d6d",
            animation: {
                enable: true,
                speed: 70,
                sync: true
            }
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 2 },
            animation: {
                enable: true,
                speed: 6,
                minimumValue: 2,
                sync: true
            }
        },
        opacity: {
            value: { min: 0.2, max: 1 },
            animation: {
                sync: true,
                enable: true,
                speed: 3,
                minimumValue: 0,
                destroy: "minimumValue",
            }
        },
        move: {
            enable: true,
            direction: "none",
            speed: { min: 0.2, max: 2 }, // TIE?
            random: false,
            straight: false,
            size: true,
            outModes: {
              default: "destroy",
            },
        },
        line_linked: {
            enable: true,
            distance: 100,  // TIE DONE
            color: "random",
            opacity: 0.4,   // TIE DONE
            width: 1,
            triangles: {
              enable: true,
              color: "#ffffff",
              opacity: 0.1  // TIE DONE
            }
        },
        life: {
            duration: {
                sync: false,
                value: { min: 1, max: 2 },
            },
            count: 1,
        },
    },
    emitters: [
        {
        name: "s1",
        direction: "none",
        angle: 45,
        rate: {
          quantity: 7,  // TIE
          delay: { min: 0.5, max: 2}
        },
        shape: {
            type: "circle"
        },
        size: {
          width: 35,
          height: 20
        },
        position: {
          x: 65,
          y: 25
        },
    },
    {
        name: "s2",
        direction: "none",
        angle: 45,
        rate: {
          quantity: 7,  // TIE
          delay: { min: 0.5, max: 2}
        },
        shape: {
            type: "circle"
        },
        size: {
          width: 10,
          height: 45
        },
        position: {
          x: 55,
          y: 45
        },
    },
    ]
}

const fpsScribble = {
    fullScreen: {
        enable: true
    },
    zIndex: 2,
    fpsLimit: 7,
    particles: {
        number: {
          value: 0,
          zIndex: 1
        },
        color: {
            value: "#434b64",
            animate: {
                l: {
                    enable: true,
                    speed: 10,
                    offset: { min: 15, max: 100 },
                }
            }
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 0.5, max: 1 }
        },
        move: {
            enable: true,
            outModes: {
                default: "destroy",
            },
        },
        line_linked: {
            enable: true,
            distance: 200,
            opacity: 0.5,
            width: 0.5,
            triangles: {
              enable: true,
              color: "#2e3854",
              opacity: 0.2,
            }
        },
    },
    emitters: {
        name: "lowfpsEmitter",
        direction: "none",
        rate: {
          quantity: 10,  // TIE?
          delay: { min: 50, max: 100 }  //TIE
        },
        shape: {
            type: "circle"
        },
        size: {
          width: 50,
          height: 50
        },
        position: {
          x: 65,
          y: 25
        },
    },
}

const baseOptions = {
    fpsLimit: 60,
    zIndex: 0,
    fullScreen: {
        enable: true
    },
    particles: {
        number: {
          value: 0,
          zIndex: 1
        },
        color: {
            value: "#393942",
            animation: {
                enable: true,
                speed: 100,
                sync: true,
                l: {
                    enable: true,
                    speed: 10,
                    offset: { min: 40, max: 80 },
                }
            }
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 6 },
            animation: {
                enable: true,
                speed: 4,
                minimumValue: 2,
                sync: true
            }
        },
        opacity: {
            value: 1,
            random: false,
            animation: {
                sync: true,
                enable: true,
                speed: 3, // TIE DONE
                minimumValue: 0,
            }
        },
        move: {
            enable: true,
            direction: "none",
            speed: { min: 0.3, max: 7 }, // TIE
            random: false,
            straight: false,
            size: true,
            outModes: {
              default: "destroy",
            },
        },
        line_linked: {
            enable: true,
            distance: 15, // TIE
            opacity: 0.3,
            width: 0.5,
          },
        life: {
            duration: {
                sync: false,
                value: { min: 2, max: 6 },  // TIE
            },
            count: 1,
        },
    },
    emitters: {
        name: "baseEmitter",
        direction: "none",
        rate: {
          quantity: 2,  //TIE
          delay: 0.08
        },
        shape: {
            type: "circle"
        },
        size: {
          width: 30,
          height: 50
        },
        position: {
          x: 65,
          y: 40
        },
    },
}

const basest = {
    fpsLimit: 60,
    zIndex: 0,
    fullScreen: {
        enable: true
    },
    particles: {
        number: {
          value: 35,
          zIndex: 1
        },
        color: {
            value: "#474766",
            animation: {
                enable: true,
                speed: 100,
                sync: true,
            }
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
            animation: {
                enable: true,
                speed: 1,
                minimumValue: 2,
                sync: true
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            animation: {
                sync: true,
                enable: true,
                speed: 0.5, // TIE DONE
                minimumValue: 0,
            }
        },
        move: {
            enable: true,
            direction: "none",
            speed: { min: 0.3, max: 7 }, // TIE
            random: false,
            straight: false,
            size: true,
        },
    },
}
/*
const comet = {
    fpsLimit: 60,
    particles: {
        number: {
        value: 0
        },
        collisions: {
        enable: false
        },
        color: {
        value: "#ffffff"
        },
        shape: {
        type: "circle"
        },
        opacity: {
        value: { min: 0.3, max: 0.8 }
        },
        size: {
        value: { min: 1, max: 10 }
        },
        move: {
        enable: true,
        size: true,
        speed: 5,
        direction: "none",
        outModes: {
            default: "destroy"
        },
        trail: {
            enable: true,
            fillColor: "#000000",
            length: 3
        }
        }
    },
    emitters: {
        direction: "none",
        rate: {
          delay: 0.25,
          quantity: 10
        },
        position: {
          x: 50,
          y: 50
        },
        size: {
          width: 0,
          height: 0
        },
        spawnColor: {
          value: "#ff0000",
          animation: {
            h: {
              enable: true,
              speed: 5
            },
            l: {
              enable: true,
              speed: 0,
              offset: {
                min: 20,
                max: 80
              }
            }
          }
        }
    }
}*/
