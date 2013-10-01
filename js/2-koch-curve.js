/*global chaos */

(function () {
    'use strict';

    var maxDepth = 0;

    function init() {

        chaos.init();
        draw();

        document.body.addEventListener('keyup', function (ev) {
            switch (ev.keyCode) {
            case 32:    // space bar
                maxDepth += 1;
                if (maxDepth < 6) {
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
        var p0 = {
            x: chaos.width * 0.1,
            y: chaos.height * 0.75,
        };

        var p1 = {
            x: chaos.width * 0.9,
            y: chaos.height * 0.75,
        };

        chaos.clear();
        chaos.context.lineWidth = 2;

        koch(p0, p1, maxDepth);
    }

    function koch(p0, p1, depth) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,

            // segment length
            dist = Math.sqrt(dx * dx + dy * dy),

            // length of each sub-segment
            unit = dist / 3,

            // angle of the main segment
            angle = Math.atan2(dy, dx),

            pa, pb, pc;

        // calculate the three intermediate points
        pa = {
            x: p0.x + Math.cos(angle) * unit,
            y: p0.y + Math.sin(angle) * unit
        };
        pb = {
            x: pa.x + Math.cos(angle - Math.PI / 3) * unit,
            y: pa.y + Math.sin(angle - Math.PI / 3) * unit
        };
        pc = {
            x: p0.x + Math.cos(angle) * unit * 2,
            y: p0.y + Math.sin(angle) * unit * 2
        };

        if (depth === 0) {
            chaos.context.beginPath();
            chaos.context.moveTo(p0.x, p0.y);
            chaos.context.lineTo(pa.x, pa.y);
            chaos.context.lineTo(pb.x, pb.y);
            chaos.context.lineTo(pc.x, pc.y);
            chaos.context.lineTo(p1.x, p1.y);
            chaos.context.stroke();
        }
        else {
            koch(p0, pa, depth - 1);
            koch(pa, pb, depth - 1);
            koch(pb, pc, depth - 1);
            koch(pc, p1, depth - 1);
        }
    }

    init();

}());
