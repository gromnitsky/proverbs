# SEV: out, bower-static.out, bower-static.files, bower-static.minify.suffix

.PHONY: bower-static-all
bower-static-all:

bower-static.all := $(addprefix $(out)/$(bower-static.out)/, $(bower-static.files))

bower-static.src.suffix := $(filter $(bower-static.minify.suffix), $(sort $(suffix $(bower-static.files))))

# $(call bower-static-suffix-change, FILE, SUFFIX)
bower-static-suffix-change = $(patsubst %$(2),%.min$(2), $1)
# $(call bower-static-get-file, FILE, SUFFIX)
bower-static-get-file = $(or $(wildcard $(out)/bower_components/$(call bower-static-suffix-change,$1,$2)), $(out)/bower_components/$1)

# $(call bower-static-get-source, FILE)
ifdef bower-static.src.suffix
bower-static-get-source = $(foreach suffix, $(bower-static.src.suffix),$(call bower-static-get-file,$1,$(suffix)))
else
bower-static-get-source = $(out)/bower_components/$1
endif

define bower-static-rule =
$$(out)/$$(bower-static.out)/$1: $(call bower-static-get-source,$1)
	$$(copy)
endef

# generate file rules
$(foreach file,$(bower-static.files),$(eval $(call bower-static-rule,$(file))))

bower-static-all: $(bower-static.all)
