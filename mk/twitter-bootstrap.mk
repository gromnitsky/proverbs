# SEV: out, bower-static.out
# npm: less

.PHONY: twitter-bootstrap-all
twitter-bootstrap-all:

$(out)/src/main.css: $(src)/src/main.less
	$(mkdir-target)
	$(out)/node_modules/.bin/lessc --include-path=$(out) $< $@

twitter-bootstrap.all := $(out)/src/main.css

twitter-bootstrap-all: $(twitter-bootstrap.all)
