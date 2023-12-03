export const burstOptions = {
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
        name: "burstEmitter",
        direction: "none",
        rate: {
          quantity: 40,
          delay: { min: 20, max: 100 }
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
