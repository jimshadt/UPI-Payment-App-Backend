SystemJS.config({
    map: {
        'socket.io-client': 'node_modules/socket.io-client/dist/socket.io.js'
    },
    packages: {
        src: {
            defaultExtension: 'js'
        }
    }
});
