/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        packageConfigPaths: [
            './node_modules/*/package.json',
            './node_modules/@angular/*/package.json'
        ],
        paths: {
            '*': 'node_modules/*',
            'app': 'app',
            'app/*': 'app/*',
            'common': 'common',
            'common/*': 'common/*',
        },
        map: {
            'socket.io-client': './node_modules/socket.io-client/dist/socket.io.min.js',
            'materialize-css': './node_modules/materialize-css/dist/js/materialize.js',
            'text': './systemjs-text-plugin.js'
        },
        packages: {
            'app': {
                main: './main.js',
                defaultExtension: 'js'
            },
            'common': {
                defaultExtension: 'js'
            },
            'app/*.html': {
                defaultExtension: false
            }
        },
        meta: {
            'materialize-css': { format: 'global' },
            'babel-polyfill/dist/polyfill.js': { format: 'global' },
            'zone.js/dist/zone.js': { format: 'global' },
            'reflect-metadata/Reflect.js': { format: 'global' },
            'jquery': { format: 'global' },
            'jquery-ui-dist/jquery-ui.js': { format: 'global' },
            'ace-builds/src-noconflict/ace.js': {
                format: 'global'
            },
            'ace-builds/src-noconflict/ext-language_tools.js': {
                format: 'global',
                deps: ['ace-builds/src-noconflict/ace.js']
            },
            'app/*.html': {
                loader: 'text'
            },
            'app/*.css': {
                loader: 'text'
            },
            'app/blockly/lib/blockly_compressed.js': {
                format: 'global'
            },
            'app/blockly/lib/blocks_compressed.js': {
                format: 'global',
                deps: ['./blocks_compressed.js']
            },
            'app/blockly/lib/python_compressed.js': {
                format: 'global',
                deps: ['./blocks_compressed.js']
            },
            'app/blockly/lib/blocks/hedgehog.js': {
                format: 'global',
                deps: ['../blocks_compressed.js']
            }
        }
    });
})(this);