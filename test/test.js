var fs = require('fs');
var assert = require('assert');
var githubContents = require(__dirname + '/..');

describe('github-contents', function() {

    it('should fetch the contents of a file in a github repo', function(done) {
        githubContents('fshost/github-contents', 'index.js', function(err, contents) {
            if (err) throw err;
            var expectedContents = fs.readFileSync(__dirname + '/../index.js').toString();
            assert.equal(contents, expectedContents);
            done();
        });
    });

    it('should fetch the contents of a nested file in a github repo', function(done) {
        githubContents('fshost/github-contents', 'test/test.js', function(err, contents) {
            if (err) throw err;
            var expectedContents = fs.readFileSync(__dirname + '/test.js').toString();
            assert.equal(contents, expectedContents);
            done();
        });
    });

});