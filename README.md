github-contents
-----------------
Gets the contents of a file from a public Github repo using the github API.

#### installation

    npm install github-contents

#### usage

```javascript
var githubContents = require('github-contents');
githubContents('lib/xmlrpc-router.js', function (err, contents) {
    console.log(contents);
 });
```

#### pros
- uses the official github API and therefore stable (getting files via raw http address is going away).

#### cons
- fimited to 60 requests per hour (as per standard github policy for unauthenticated requests).
- fetches the entire file's contents at once.  A streaming method for low memory-consumption would be preferable.

#### roadmap
At some point I'd like to add a few more methods / options:

- allow authentication so as to be able to make more requests per hour and/or for getting contents from a private repo
- add a streaming method for low memory-consumption so that this could be run on a VPS without worrying about memory usage.
- possibly some other file-related methods, maybe even something like a fs module that works through github transparently

feel free to send PR for the above, other features, etc.


#### license
MIT Style License (see LICENSE.txt)