# npm: mocha

TEST_MOCHA_OPTS :=

test-mocha.files := $(shell find $(test-mocha.files.dir) -type f -name 'test_*.js')
export TEST_MOCHA_DIR := $(dir $(test-mocha.files))
export TEST_MOCHA_OUT := $(out)

.PHONY: test-mocha
test-mocha:
	@$(out)/node_modules/.bin/mocha --harmony -u tdd $(TEST_MOCHA_OPTS) $(test-mocha.files)
