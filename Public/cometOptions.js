export function cometUpdate(container, liveData) {
    container.options.particles.opacity.animation.speed = liveData['HR'] / 10;
    container.options.particles.move.speed = liveData['HR'] / 100;
}

export const cometOptions = {
    fps_limit: 60,
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#f00",
            animation: {
                enable: true,
                speed: 5,
                sync: true
            }
        },
        move: {
            trail: {
                enable: true,
                fillColor: "#000000",
                length: 1000
            },
            direction: "none",
            enable: true,
            out_mode: "destroy",
            random: false,
            speed: 1,
            straight: false,
            warp: true,
            noise: {
                enable: true,
                delay: {
                    value: 0.001
                }
            },
            
        },
        opacity: {
            anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
            random: true,
            value: 0.5
        },
        shape: {
            character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400"
            },
            polygon: { nb_sides: 5 },
            stroke: { color: "random", width: 0 },
            type: "circle"
        },
        size: {
            value: 1
        },
    },
    retina_detect: true,
    emitters: {
        name: "cometEmitter",
        position: {
          x: 80,
          y: 25
        },
        rate: {
          delay: 0.3,
          quantity: 1
        },
        size: {
          width: 10,
          height: 10
        },
        particles: {
          color: {
            value: "#00f"
          }
        }
    },
}
