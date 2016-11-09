$(document).ready(function () {
    YugenLogo.initialize( {
        framerate: 60,

        width: 320,
        height: 160,
        colorSpeedFactor: 0.4,
        morphSpeedFactor: 0.4,
        introSpeedFactor: 2,
        outroSpeedFactor: 2,

        morphStrengthFactor: 0.8,

        morphBaseSpeedFactor: 0.2,
        normalOffsetFactor: 1.5,

        maxShapeRotation: 0.2,

        wordOffsetX: 0,
        wordOffsetY: 0,

        wordScale: 1,

        foregroundScaleX: 0.42,
        foregroundScaleY: 0.21,
        backgroundScaleX: 0.36,
        backgroundScaleY: 0.21,

        shadowAlpha: 0.1,

        shapeQuality: 9,

        containerID: "logo-bg",
        logoCanvasID: "logo-canvas",

        colors:[
            [new YugenLogo.util.Color(240, 240, 240), new YugenLogo.util.Color(0, 0, 0)],
            [new YugenLogo.util.Color(0, 0, 0), new YugenLogo.util.Color(240, 240, 240)]
        ],

        inputs: [
            YugenLogo.input.move,
            YugenLogo.input.press
        ],

        fallbackImages: [
        ]
    });
});