describe('github-contents', function() {
    var githubContents = require(__dirname + '/..');

    it('should fetch the contents of a file in a github repo', function(done) {
        githubContents('fshost/github-contents', 'index.js', function(err, contents) {
            if (err) throw err;
            var expectedContents = require('fs').readFileSync(__dirname + '/../index.js').toString();
            assert.equal(contents, expectedContents);
        });
    });

});