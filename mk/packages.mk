packages.all := $(out)/node_modules $(out)/bower_components

.PHONY: packages-all
packages-all: $(packages.all)

define packages-install =
mkdir -p $(dir $@)
cp $< $(dir $@)
cd $(dir $@) && $1 install
touch $@
endef

$(out)/node_modules: $(src)/package.json
	$(call packages-install, npm)

$(out)/bower_components: $(src)/bower.json
	$(call packages-install, bower)
