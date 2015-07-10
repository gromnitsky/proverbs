# SEV: src, static.files

.PHONY: static-all
static-all:

static.all := $(patsubst $(src)/%, $(static.out)/%, $(static.files))

static-all: $(static.all)

$(static.all): $(static.out)/%: $(src)/%
	$(copy)
