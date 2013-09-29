/*global chaos */

(function () {
    'use strict';

    function draw() {
        var random = Math.random,
            floor = Math.floor,
            x = random() * (chaos.width - 100),
            y = random() * (chaos.height - 100),
            w = 20 + random() * 100,
            h = 20 + random() * 100,
            r = floor(random() * 256),
            g = floor(random() * 256),
            b = floor(random() * 256);

        chaos.context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        chaos.context.fillRect(x, y, w, h);
    }

    chaos.init();
    draw();

    document.body.addEventListener('keyup', function (ev) {
        switch (ev.keyCode) {
        case 32:    // space bar
            draw();
            break;
        case 80:    // p key
            chaos.popImage();
            break;
        default:
            break;
        }
    });
}());
