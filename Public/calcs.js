// HR average: 40 - 130
// PLETH_SPO2 average: 90 - 110
// PLETH: random value, -15 - 15 

// eg. heart rate 0 - 7
// (((hr - 55) / 9), 0), 7)
export function linearClamp(hr, offset, multiplier, min, max) {
    return Math.min(Math.max(((hr - offset) * multiplier), min), max);
}