# Session Context

- Fix repository `@alexandregme/zl_js_lint` so installing from repo copies and updates scripts.
- Consumer package currently depends on `github:alexandregme/zl_js_lint` and runs sync script via postinstall.
- Need to ensure scripts are copied/adjusted during install.
- Keep this document updated with decisions/outstanding tasks to preserve context across sessions.
- Pending: audit `bin/zl-quality-sync.mjs` to understand copy process and identify changes required.

