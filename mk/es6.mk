# SEV: out, es6.out, es6.files, es6.suffix
# npm: babel

.PHONY: es6-all
es6-all:

es6.suffix := $(if $(es6.suffix),$(es6.suffix),.js)
es6.all := $(patsubst $(src)/%.js, $(es6.out)/%$(es6.suffix), $(es6.files))

$(es6.out)/%$(es6.suffix): $(src)/%.js
	$(mkdir-target)
	$(out)/node_modules/.bin/babel $< -o $@

ifneq ($(es6.suffix), .js)
.INTERMEDIATE: $(es6.all)
endif

es6-all: $(es6.all)
