import "babel-polyfill";
import assert = require('assert');
import sinon = require('sinon');
import Hapi = require('hapi');
import Api from "../../../../../src/server/api/Api";
import ApiResource from "../../../../../src/server/api/ApiResource";
import ProgramResource from "../../../../../src/server/api/resource/versioncontrol/ProgramResource";
import Program from "../../../../../src/common/versioncontrol/Program";
import Version from "../../../../../src/common/versioncontrol/Version";
import GitProgramStorage from "../../../../../src/server/versioncontrol/GitProgramStorage";
import modelRegistry from "../../../../../src/server/jsonapi/ModelSerializerRegistry";

function setupApiServer(...resources: ApiResource[]) {
    let server = new Hapi.Server();
    server.connection({
        host: 'localhost',
        port: 61749
    });

    let api = new Api(server, '/api');
    for(const resource of resources) {
        api.registerEndpoint(resource);
    }
    return server;
}

describe('ProgramResource', () => {
    let server: Hapi.Server;
    let programResource: ProgramResource;

    before(() => {
        programResource = new ProgramResource(null, modelRegistry);
        server = setupApiServer(programResource);
    });

    describe('createProgram', () => {
        it('should create a new program', (done) => {
            const creationDate = new Date();

            let storage = new GitProgramStorage(null);
            let mock: any = sinon.mock(storage);
            (<any>programResource).programStorage = storage;
            mock.expects('createProgram')
                .once()
                .returns(Promise.resolve(new Program(storage, 'program', 'version1')));

            mock.expects('getVersionIds')
                .returns(Promise.resolve(['version1']));

            mock.expects('getVersion')
                .returns(Promise.resolve(new Version(storage, 'program', 'version1', '', '', creationDate, [], '')));

            server.inject({
                url: '/api/programs',
                method: 'POST',
                payload: {
                    data: {
                        type: 'program',
                        attributes: {
                            name: 'program'
                        }
                    }
                }
            }, (res) => {
                mock.verify();
                assert.deepEqual(JSON.parse(res.payload), {
                    type: 'program',
                    id: 'cHJvZ3JhbQ==',
                    attributes: {
                        name: 'program',
                        creationDate: creationDate.toISOString()
                    },
                    relationships: {
                        versions: {
                            links: {
                                related: 'http://localhost:61749/api/versions/cHJvZ3JhbQ=='
                            }
                        },
                        workingtree: {
                            links: {
                                related: 'http://localhost:61749/api/workingtrees/cHJvZ3JhbQ=='
                            }
                        }
                    }
                });
                done();
            });
        });
    });

    describe('getProgram', () => {
        it('should load and return an existing program', (done) => {
            const creationDate = new Date();

            let storage = new GitProgramStorage(null);
            let mock: any = sinon.mock(storage);
            (<any>programResource).programStorage = storage;
            mock.expects('getProgram')
                .once()
                .withExactArgs('program1')
                .returns(Promise.resolve(new Program(storage, 'program1', 'version1')));

            mock.expects('getVersionIds')
                .returns(Promise.resolve(['version1']));

            mock.expects('getVersion')
                .returns(Promise.resolve(new Version(storage, 'program1', 'version1', '', '', creationDate, [], '')));

            server.inject({
                url: '/api/programs/cHJvZ3JhbTE=',
                method: 'GET'
            }, (res) => {
                mock.verify();
                assert.deepEqual(JSON.parse(res.payload), {
                    type: 'program',
                    id: 'cHJvZ3JhbTE=',
                    attributes: {
                        name: 'program1',
                        creationDate: creationDate.toISOString()
                    },
                    relationships: {
                        versions: {
                            links: {
                                related: 'http://localhost:61749/api/versions/cHJvZ3JhbTE='
                            }
                        },
                        workingtree: {
                            links: {
                                related: 'http://localhost:61749/api/workingtrees/cHJvZ3JhbTE='
                            }
                        }
                    }
                });
                done();
            });
        });
    });

    describe('getProgramList', () => {
        it('should return a list containing all programs stored on the controller', (done) => {
            const creationDate = new Date();

            let storage = new GitProgramStorage(null);
            let mock: any = sinon.mock(storage);
            (<any>programResource).programStorage = storage;

            mock.expects('getProgramNames')
                .once()
                .returns(Promise.resolve(['program1', 'program2']));

            mock.expects('getProgram')
                .once()
                .withExactArgs('program1')
                .returns(Promise.resolve(new Program(storage, 'program1', 'version1')));
            mock.expects('getVersionIds')
                .withExactArgs('program1')
                .returns(Promise.resolve(['version1']));
            mock.expects('getVersion')
                .withExactArgs('program1', 'version1')
                .returns(Promise.resolve(new Version(storage, 'program1', 'version1', '', '', creationDate, [], '')));

            mock.expects('getProgram')
                .once()
                .withExactArgs('program2')
                .returns(Promise.resolve(new Program(storage, 'program2', 'version2')));
            mock.expects('getVersionIds')
                .withExactArgs('program2')
                .returns(Promise.resolve(['version2']));
            mock.expects('getVersion')
                .withExactArgs('program2', 'version2')
                .returns(Promise.resolve(new Version(storage, 'program2', 'version2', '', '', creationDate, [], '')));

            server.inject({
                url: '/api/programs',
                method: 'GET'
            }, (res) => {
                mock.verify();
                assert.deepEqual(JSON.parse(res.payload),{
                    links: {
                        self: 'http://localhost:61749/api/programs'
                    },
                    jsonapi: {
                        version: '1.0'
                    },
                    data: [
                        {
                            type: 'program',
                            id: 'cHJvZ3JhbTE=',
                            attributes: {
                                name: 'program1',
                                creationDate: creationDate.toISOString()
                            },
                            relationships: {
                                versions: {
                                    links: {
                                        related: 'http://localhost:61749/api/versions/cHJvZ3JhbTE='
                                    }
                                },
                                workingtree: {
                                    links: {
                                        related: 'http://localhost:61749/api/workingtrees/cHJvZ3JhbTE='
                                    }
                                }
                            }
                        },
                        {
                            type: 'program',
                            id: 'cHJvZ3JhbTI=',
                            attributes: {
                                name: 'program2',
                                creationDate: creationDate.toISOString()
                            },
                            relationships: {
                                versions: {
                                    links: {
                                        related: 'http://localhost:61749/api/versions/cHJvZ3JhbTI='
                                    }
                                },
                                workingtree: {
                                    links: {
                                        related: 'http://localhost:61749/api/workingtrees/cHJvZ3JhbTI='
                                    }
                                }
                            }
                        }
                    ]
                });
                done();
            });
        });
    });
});
