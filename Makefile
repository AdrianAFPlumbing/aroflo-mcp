SHELL := /bin/bash

.DEFAULT_GOAL := help

help: ## Show targets
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_\-]+:.*##/ {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}' Makefile

install: deps build link ## Install globally as `aroflo-mcp` (via npm link)

uninstall: ## Remove global `aroflo-mcp` (npm unlink)
	@npm unlink -g aroflo-mcp >/dev/null 2>&1 || true

deps: ## Install dependencies (uses package-lock.json)
	@npm install

build: ## Compile TypeScript to dist/
	@npm run build

link: ## Link package globally so `aroflo-mcp` is on PATH
	@npm link
	@echo "Installed: $$(command -v aroflo-mcp)"

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
