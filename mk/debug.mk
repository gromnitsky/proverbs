# Run 'make p-obj' to print obj variable value.
p-%:
	@echo "$* [$(origin $*), $(flavor $*)]" = "$($*)"

pp-%:
	@echo "$(strip $($*))" | tr ' ' \\n
