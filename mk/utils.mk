mkdir-target = @mkdir -p $(dir $@)

define copy =
$(mkdir-target)
cp $< $@
endef
