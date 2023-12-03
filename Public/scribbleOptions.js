import { linearClamp } from './calcs.js';

export function scribbleUpdate(container, liveData) {
    if (liveData['PLETH_HR'] < 71) {
        container.options.particles.opacity.value = 0;
        container.options.particles.line_linked.opacity = 0;
        container.options.particles.line_linked.triangles.opacity = 0;
        return;
    } else {
        container.options.particles.opacity.value = 1;
        container.options.particles.line_linked.opacity = 0.5;
        container.options.particles.line_linked.triangles.opacity = 0.1;
    }
    container.options.emitters[0].rate.quantity = 7 - linearClamp(liveData['HR'], 70, 0.1, 1 , 7);
    container.options.emitters[1].rate.quantity = 7 - linearClamp(liveData['HR'], 70, 0.1, 1 , 7);
}

export const scribbleOptions = {
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
            value: 1,
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
            speed: { min: 0.2, max: 2 },
            random: false,
            straight: false,
            size: true,
            outModes: {
              default: "destroy",
            },
        },
        line_linked: {
            enable: true,
            distance: 100,
            color: "random",
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              color: "#ffffff",
              opacity: 0.1,
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
          quantity: 7,
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
          quantity: 7,
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
          y: 55
        },
    },
    ]
}
