import { linearClamp } from './calcs.js';

export function polygonUpdate(container, liveData) {
    container.options.emitters.rate.delay.max = 300 - (liveData['HR']);
    container.options.particles.line_linked.triangles.opacity = Math.random();
    container.options.emitters.rate.quantity = linearClamp(liveData['PLETH_SPO2'], 90, 2, 5, 10);
}

export const polygonOptions = {
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
                    speed: 5,
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
            distance: 150,
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
          quantity: 10,
          delay: { min: 50, max: 100 }
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