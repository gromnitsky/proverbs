.DELETE_ON_ERROR:

src := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
mk := $(src)/mk

out := devel
ifeq ($(NODE_ENV), production)
out := release
endif

.PHONY: compile
compile:

include $(mk)/debug.mk
include $(mk)/utils.mk
include $(mk)/packages.mk

static.out := $(out)
static.files := $(wildcard \
	$(src)/client/*.html \
	$(src)/client/*.css)

es6.out := $(out)
es6.files := $(wildcard $(src)/src/*.js)
ifeq ($(NODE_ENV), production)
es6.suffix := .raw.js
endif
include $(mk)/es6.mk

js-minify.files := $(es6.all)
js-minify.suffix.from := .raw.js
js-minify.suffix.to := .js
include $(mk)/js-minify.mk

test-mocha.files.dir := $(src)/test
include $(mk)/test-mocha.mk

compile.all := \
	$(packages.all) \
	$(static.all) \
	$(js-minify.all)

compile: $(compile.all)

.PHONY: test
test: compile test-mocha
