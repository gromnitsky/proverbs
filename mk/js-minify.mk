# SEV: js-minify.suffix.from, js-minify.suffix.to, js-minify.files
# npm: uglifyjs2

.PHONY: js-minify-all
js-minify-all:

js-minify.all := $(js-minify.files:%$(js-minify.suffix.from)=%$(js-minify.suffix.to))

%$(js-minify.suffix.to): %$(js-minify.suffix.from)
	$(out)/node_modules/.bin/uglifyjs $< -o $@

js-minify-all: $(js-minify.all)
