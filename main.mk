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
	$(src)/src/*.html \
	$(src)/src/*.css)
include $(mk)/static.mk

bower-static.out := src/vendor
ifeq ($(NODE_ENV), production)
bower-static.minify.suffix := .js .css
endif
bower-static.files := \
	angular/angular.js \
	angular-route/angular-route.js
include $(mk)/bower-static.mk

es6.out := $(out)/.tmp
es6.files := $(wildcard $(src)/src/*.js)
include $(mk)/es6.mk

browserify.out := $(out)
browserify.src := $(es6.out)
browserify.files := $(browserify.src)/src/main.js
ifeq ($(NODE_ENV), production)
browserify.suffix := .raw.js
endif
include $(mk)/browserify.mk

js-minify.files := $(browserify.all)
js-minify.suffix.from := .raw.js
js-minify.suffix.to := .js
include $(mk)/js-minify.mk

test-mocha.files.dir := $(src)/test
include $(mk)/test-mocha.mk

compile.all := \
	$(packages.all) \
	$(static.all) \
	$(bower-static.all) \
	$(es6.all) \
	$(js-minify.all)

compile: $(compile.all)

.PHONY: test
test: compile test-mocha
