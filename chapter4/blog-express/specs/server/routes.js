/**
 * Created by darren on 8/7/14.
 */
var path = require('path')
    , pathConfig = require('./path-config.json')
    , appPath = path.join(pathConfig.distJs,'bin/app')
    , boot = require(appPath).boot
    , shutdown = require(appPath).shutdown
    , port = require(appPath).port
    , superagent = require('superagent')
    , expect = require('expect.js');

describe('server', function () {
    before(function () {
        boot();
    });

    describe('homepage', function () {
        it('should respond to GET', function (done) {
            superagent
                .get('http://localhost:' + port)
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    after(function () {
        shutdown();
    });
});