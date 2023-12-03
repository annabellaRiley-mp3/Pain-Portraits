import { linearClamp } from './calcs.js';

export function baseUpdate(container, liveData) {
    container.options.particles.opacity.animation.speed = linearClamp(liveData['HR'], 55, 0.11, 0, 5);
    container.options.particles.move.speed.max = linearClamp(liveData['HR'], 50, 0.1, 0, 20);

    var temp = Math.round(70 + 2 * liveData['PLETH']);
    container.options.particles.color.value = "rgb(" + temp + ', ' + temp + ', ' + (temp + 10) + ')';
    container.options.particles.size.value.max = liveData['PLETH_SPO2'] / 20;
}

export const baseOptions = {
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
            value: "rgb(57, 57, 66)",
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
            },
        },
        opacity: {
            value: 1,
            random: false,
            animation: {
                sync: true,
                enable: true,
                speed: 3,
                minimumValue: 0,
            }
        },
        move: {
            enable: true,
            direction: "none",
            speed: { min: 0, max: 7 },
            random: false,
            straight: false,
            size: true,
            outModes: {
              default: "destroy",
            },
        },
        line_linked: {
            enable: true,
            distance: 15,
            opacity: 0.3,
            width: 0.5,
          },
        life: {
            duration: {
                sync: false,
                value: { min: 1, max: 6 },
            },
            count: 1,
        },
    },
    emitters: {
        name: "baseEmitter",
        direction: "none",
        rate: {
          quantity: 2,
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
