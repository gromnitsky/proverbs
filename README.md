# Proverbs

A JFF SPA viewer of a collection of ancient and modern proverbs from
peoples around the world.

Uses lunr.js for the FTS. Doesn't contain any server-side code. A
usual, dull Angular app.

## Why?

Sometimes I enjoy trolling people's Facebook posts w/ 'wisdom', thus I
needed a way to query a DB w/ proverbs.

If you'd like to add a missing proverb, edit `src/misc.txt`, the go to
the temporal directory and type:

	$ make -f PATH_TO_THE_SOURCE/proverbs/main.mk NODE_ENV=production

(iojs 2.x & bower are required.)

The directory `release/src` will contain full, ready to deploy, SPA
code. rsync it to a directory that is served by any static HTTP
server.

## Bugs

* Sometimes UI may seem unresponsive because Angular freaks out at the
  amount of data.

## License

MIT.

The file `src/jrs.txt` in an extract from the book _The Routledge Book
of World Proverbs_. In theory the text in the file should be
copyrighted because of "No part of this book may be reprinted ...",
blah-blah, but all proverbs are naturally in public domain, unless we
consider a translation as a derivative work (for example, there are
Chinese proverbs there). Nevertheless, I _think_ it's the same as to
claim a copyright on Beowulf poem because you've printed it on a shiny
paper.
