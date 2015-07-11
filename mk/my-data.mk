# SEV: out, src, es6.out

.PHONY: my-data-all
my-data-all:

my-data.all := $(out)/src/data.json $(es6.out)/src/package.json

my-data.files := $(wildcard $(src)/src/*.txt)

my-data-all: $(my-data.all)

$(es6.out)/src/package.json: $(src)/package.json
	$(copy)

$(out)/src/data.json: $(my-data.files)
	$(mkdir-target)
	NODE_PATH=$(out)/node_modules $(src)/mk/scripts/txt2json $^ > $@
