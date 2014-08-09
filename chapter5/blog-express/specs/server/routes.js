/**
 * Created by darren on 8/7/14.
 */
var path = require('path')
    , pathConfig = require('./path-config.json')
    , appPath = path.join(pathConfig.distJs,'bin/app')
    , boot = require(appPath).boot
    , shutdown = require(appPath).shutdown
    , port = require(appPath).port
    , expect = require('expect.js')
    , superagent = require('superagent');

var seedArticles = require(path.join(pathConfig.dataCollection , 'articles.json'));

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

        it('should contain posts', function (done) {
            superagent
                .get('http://localhost:' + port)
                .end(function (res) {
                    seedArticles.forEach(function (item, index, list) {
                        if(item.published) {
                            expect(res.text).to
                                .contain('<h2><a href="/articles' + item.slug + '">' + item.title);
                        } else {
                            expect(res.text).not.to
                                .contain('<h2><a href="/articles' + item.slug + '">' + item.title);
                        }
                    });
                    done();
                });
        });
    });

    describe('article page', function () {
        it('should display text', function (done) {
            var count = seedArticles.length;
            seedArticles.forEach(function (item, index, list) {
                superagent
                    .get('http://localhost:' + port + '/articles/' + seedArticles[index].slug)
                    .end(function (res) {
                        if(item.published) {
                            expect(res.text).to
                                .contain(seedArticles[index].text);
                        } else {
                            expect(res.status).to.be(401);
                        }

                        if(index + 1 === count) {
                            done();
                        }
                    });
            });
        });
    });

    after(function () {
        shutdown();
    });
});