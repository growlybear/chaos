/*global chaos */

(function () {
    'use strict';

    var maxDepth = 0,
        numShapes = 3,
        angles = [
            // 0,              // 0 degrees
            // Math.PI * 2/3,  // 120 degrees
            // Math.PI * 4/3   // 240 degrees
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
        ],
        offset = Math.random() * Math.PI * 2,
        size = 0,
        dist = 0,
        scaleFactor = 0.6;

    function colorise() {
        var i = 6,
            ret = '#',
            hex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'],
            rand = function () {
                return Math.floor(Math.random() * 16);
            };

        while (i--) {
            ret = ret + hex[rand()];
        }

        return ret;
    }

    function init() {

        chaos.init();

        size = chaos.height / 10;
        dist = [
            size * Math.random() * 3 + 1,
            size * Math.random() * 3 + 1,
            size * Math.random() * 3 + 1
        ];

        draw();

        document.body.addEventListener('keyup', function (ev) {
            switch (ev.keyCode) {
            case 32:    // space bar
                maxDepth++;
                if (maxDepth < 10) {
                    draw();
                }
                break;
            case 80:    // p key
                chaos.popImage();
                break;
            default:
                break;
            }
        });
    }

    function draw() {
        var color = colorise();

        chaos.clear();
        chaos.context.save();
        chaos.context.translate(
            chaos.width * 0.5,
            chaos.height * 0.5
        );

        drawShape(color);
        iterate(maxDepth, color);
        chaos.context.restore();
    }

    function iterate(depth, color) {
        var i = 0;

        for (i; i < numShapes; i++) {
            chaos.context.save();
            chaos.context.rotate(angles[i] + offset);
            chaos.context.translate(dist[i], 0);
            chaos.context.scale(scaleFactor, scaleFactor);

            drawShape(color);

            if (depth > 0) {
                iterate(depth - 1);
            }

            chaos.context.restore();
        }
    }

    function drawShape(color) {
        chaos.context.fillStyle = color;
        chaos.context.beginPath();
        // chaos.context.arc(0, 0, size, 0, Math.PI * 2, false);
        chaos.context.rect(0, 0, 20, 400);
        // chaos.context.font = 'bold italic 80pt Calibri';
        // chaos.context.textAlign = 'center';
        // chaos.context.fillText('Samuel Allan!', 0, 0);
        chaos.context.fill();
    }

    init();

}());
