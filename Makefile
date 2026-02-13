SHELL := /bin/bash

.DEFAULT_GOAL := help

help: ## Show targets
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_\-]+:.*##/ {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}' Makefile

install: deps build link ## Install globally as `aroflo-mcp` (via npm link)

uninstall: ## Remove global `aroflo-mcp` (npm unlink)
	@npm unlink -g aroflo-mcp >/dev/null 2>&1 || true

codex-remove: ## Remove Codex MCP server config for `aroflo`
	@codex mcp remove aroflo >/dev/null 2>&1 || true

codex-install: install ## Install + register the server in Codex (stdio). Loads .env if present.
	@set -euo pipefail; \
		if [ -f .env ]; then set -a; source .env; set +a; fi; \
		: "$${AROFLO_SECRET_KEY?Missing AROFLO_SECRET_KEY}"; \
		: "$${AROFLO_UENCODED?Missing AROFLO_UENCODED}"; \
		: "$${AROFLO_PENCODED?Missing AROFLO_PENCODED}"; \
		: "$${AROFLO_ORG_ENCODED?Missing AROFLO_ORG_ENCODED}"; \
		NODE_BIN="$$(command -v node)"; \
		SERVER_ENTRY="$$(pwd)/dist/mcp/server.js"; \
		codex mcp remove aroflo >/dev/null 2>&1 || true; \
		codex mcp add aroflo \
			--env "AROFLO_API_BASE_URL=$${AROFLO_API_BASE_URL:-https://api.aroflo.com/}" \
			--env "AROFLO_ACCEPT=$${AROFLO_ACCEPT:-text/json}" \
			--env "AROFLO_SECRET_KEY=$${AROFLO_SECRET_KEY}" \
			--env "AROFLO_UENCODED=$${AROFLO_UENCODED}" \
			--env "AROFLO_PENCODED=$${AROFLO_PENCODED}" \
			--env "AROFLO_ORG_ENCODED=$${AROFLO_ORG_ENCODED}" \
			--env "MCP_TRANSPORT=stdio" \
			-- "$${NODE_BIN}" "$${SERVER_ENTRY}" >/dev/null; \
		codex mcp get aroflo

deps: ## Install dependencies (prefers package-lock.json for reproducible installs)
	@set -euo pipefail; \
		if [ -f package-lock.json ]; then \
			npm ci; \
		else \
			echo "package-lock.json not found; falling back to npm install"; \
			npm install; \
		fi

build: ## Compile TypeScript to dist/
	@npm run build

link: ## Link package globally so `aroflo-mcp` is on PATH
	@set -euo pipefail; \
		if npm link; then \
			echo "Installed: $$(command -v aroflo-mcp)"; \
		else \
			echo "Warning: npm link failed (likely due to global npm permissions)." >&2; \
			echo "You can either:" >&2; \
			echo "  1) Configure a user npm prefix: npm config set prefix ~/.npm-global" >&2; \
			echo "     Then add ~/.npm-global/bin to PATH and re-run make install." >&2; \
			echo "  2) Skip global install and run directly: npm run build && node dist/mcp/server.js" >&2; \
		fi

test: ## Run tests
	@npm test

lint: ## Typecheck + prettier check
	@npm run lint

fmt: ## Format
	@npm run format

dev: ## Run stdio server from source
	@npm run dev

dev-http: ## Run HTTP server from source
	@npm run dev:http

start: ## Run stdio server from dist/
	@npm run start

start-http: ## Run HTTP server from dist/
	@npm run start:http

smoke: ## Live smoke test against AroFlo (requires env vars; optional AROFLO_HOST_IP)
	@node scripts/smoke.mjs

inspector: build ## Launch MCP Inspector against the local stdio server (opens a browser)
	@npx -y @modelcontextprotocol/inspector --transport stdio -- node dist/mcp/server.js
