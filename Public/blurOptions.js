import { linearClamp } from './calcs.js';

export function blurUpdate(container, liveData) {
    if (liveData['PLETH_HR'] > 70) {
        container.options.particles.opacity.value = 0;
        return;
    }

    container.options.particles.opacity.value = 1 - linearClamp(liveData['PLETH_HR'], -20, 0.01, 0.2, 1);
    container.options.emitters.rate.delay = linearClamp(liveData['PLETH_HR'], -30, 0.001, 0.05, 0.1);
    if (liveData['PLETH_HR'] > 67) {
        //yellow
        container.options.particles.color.value = "rgb(255, 244, 214)";
        container.options.emitters.size = { width: 35, height: 27, };
    } else {
        //blue
        container.options.particles.color.value = "rgb(205, 234, 255)";
        container.options.emitters.size = { width: 20, height: 25, };
    };
}

export const blurOptions = {
    fpsLimit: 60,
    fullScreen: {
        enable: true
    },
    particles: {
        number: {
          value: 0,
        },
        color: {
            value: "rgb(205, 234, 255)",
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 50, max: 60 },
        },
        opacity: {
            value: 0.5,
            random: false,
            animation: {
                sync: true,
                enable: true,
                speed: 1,
                minimumValue: 0,
            }
        },
        move: {
            enable: true,
            direction: "none",
            speed: { min: 0, max: 1 },
            random: false,
            straight: false,
            size: true,
            outModes: {
              default: "destroy",
            },
        },
        life: {
            duration: {
                sync: true,
                value: 2,
            },
            count: 1,
        },
    },
    emitters: {
        name: "blurEmitter",
        direction: "none",
        rate: {
          quantity: 1,
          delay: 0.05
        },
        shape: {
            type: "circle"
        },
        size: {
          width: 20,
          height: 20,
        },
        position: {
          x: 60,
          y: 32
        },
    },
}
