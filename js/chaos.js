var chaos = (function () {

    return {
        /**
         * Initialize the page by finding the canvas on it
         * and resizing it to full window width
         */
        init: function () {
            // TODO allow configuration here
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.setSize(
                // TODO allow for non-browser contexts
                window.innerWidth, window.innerHeight
            );
        },

        setSize: function (width, height) {
            this.width = this.canvas.width = width;
            this.height = this.canvas.height = height;
        },

        /**
         * Clears the canvas by filling it with the colour specified,
         * or erasing all pixels if no colour is specified
         */
        clear: function (color) {
            if (color) {
                this.context.fillStyle = color;
                this.content.fillRect(0, 0, this.width, this.height);
            } else {
                this.context.clearRect(0, 0, this.width, this.height);
            }
        },

        /**
         * Pops up a bitmap image representation of the
         * canvas in a new window
         */
        popImage: function () {
            var win = window.open('', 'Canvas Image'),
                src = this.canvas.toDataURL('image/png');

            win.document.write(
                '<img src="' + src +
                '" width="' + this.width +
                '" height="' +this.height + '">'
            );
        }
    };

}());
