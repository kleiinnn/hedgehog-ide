import "babel-polyfill";
import Hapi = require('hapi');
import path = require('path');
import Api from "./api/Api";
import ProgramResource from "./api/resource/versioncontrol/ProgramResource";
import GitProgramStorage from "./versioncontrol/GitProgramStorage";

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, '..')
            }
        }
    }
});
server.connection({
    host: 'localhost',
    port: 8000
});

let hedgehogApi = new Api(server, '/api');
hedgehogApi.registerEndpoint(new ProgramResource(new GitProgramStorage('tmp')));

// tslint:disable-next-line
server.register(require('inert'));

server.route({
    method: 'GET',
    path: '/node_modules/{param*}',
    handler: {
        directory: {
            path: '../../node_modules',
            redirectToSlash: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/common/{param*}',
    handler: {
        directory: {
            path: 'common',
            redirectToSlash: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'client',
            redirectToSlash: true,
            index: true
        }
    }
});

server.ext('onPreResponse', (request, reply) => {
    let response = <any> request.response;
    if (request.response.isBoom && (response.output.statusCode === 404)) {
        return reply.file(path.join(__dirname, '../client/index.html'));
    }

    return reply.continue();
});

// Start the server
server.start((err) => {

    if (err)
        throw err;

    console.log('Server running at:', server.info.uri);
});
