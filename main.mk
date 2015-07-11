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
static.files := $(wildcard $(src)/src/*.html)
include $(mk)/static.mk

bower-static.out := src/vendor
ifeq ($(NODE_ENV), production)
bower-static.minify.suffix := .js .css
endif
bower-static.files := \
	angular/angular.js \
	angular-route/angular-route.js \
	jquery/dist/jquery.js \
	bootstrap/dist/js/bootstrap.js \
	bootstrap/fonts/glyphicons-halflings-regular.eot \
	bootstrap/fonts/glyphicons-halflings-regular.svg \
	bootstrap/fonts/glyphicons-halflings-regular.ttf \
	bootstrap/fonts/glyphicons-halflings-regular.woff \
	bootstrap/fonts/glyphicons-halflings-regular.woff2
include $(mk)/bower-static.mk

include $(mk)/twitter-bootstrap.mk

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

# TODO: add dependency generation
$(browserify.all): $(es6.all)

js-minify.files := $(browserify.all)
js-minify.suffix.from := .raw.js
js-minify.suffix.to := .js
include $(mk)/js-minify.mk

test-mocha.files.dir := $(src)/test
include $(mk)/test-mocha.mk

include $(mk)/my-data.mk

compile.all := \
	$(packages.all) \
	$(static.all) \
	$(bower-static.all) \
	$(twitter-bootstrap.all) \
	$(es6.all) \
	$(js-minify.all) \
	$(my-data.all)

$(browserify.all): $(my-data.all)

compile: $(compile.all)

.PHONY: test
test: compile test-mocha
