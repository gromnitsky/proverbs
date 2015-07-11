# npm: mocha

TEST_MOCHA_OPTS :=

test-mocha.files := $(shell find $(test-mocha.files.dir) -type f -name 'test_*.js')
export TEST_MOCHA_DIR := $(dir $(test-mocha.files))
export TEST_MOCHA_OUT := $(out)

test-mocha.all := $(out)/test/data/index.json

.PHONY: test-mocha
test-mocha: $(test-mocha.all)
	$(out)/node_modules/.bin/mocha --harmony -u tdd $(TEST_MOCHA_OPTS) $(test-mocha.files)

$(out)/test/data/index.json: $(out)/src/data.json
	$(mkdir-target)
	$(src)/mk/scripts/index < $< > $@
