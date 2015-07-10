# SEV: browserify.files, browserify.suffix, browserify.out, browserify.src
# npm: browserify

.PHONY: browserify-all
browserify-all:

browserify.suffix := $(if $(browserify.suffix),$(browserify.suffix),.js)

browserify.all := $(patsubst $(browserify.src)/%.js, $(browserify.out)/%$(browserify.suffix), $(browserify.files))

$(browserify.out)/%$(browserify.suffix): $(browserify.src)/%.js
	$(out)/node_modules/.bin/browserify $< -o $@

ifneq ($(browserify.suffix), .js)
.INTERMEDIATE: $(browserify.all)
endif

browserify-all: $(browserify.all)
