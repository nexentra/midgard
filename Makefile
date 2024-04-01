
build:
	@go build -ldflags="-w -s -extldflags '-static' -X main.VERSION=$${version:?}" . 
	@chmod +x ./midgard

start-dev:
	@docker compose --project-directory ./ -f ./ci/compose/midgard-local-dev.yaml up

quick-start:
	-@mkdir -p ./ci/data/sqlite
	@touch ./ci/data/sqlite/sqlite.db
	@docker compose --project-directory ./ -f ./ci/compose/quick-start.yaml up --force-recreate --remove-orphans

quick-start-mysql:
	-@mkdir -p ./ci/data/mysql
	@docker compose --project-directory ./ -f ./ci/compose/quick-start-mysql.yaml up --force-recreate --remove-orphans

quick-start-postgres:
	-@mkdir -p ./ci/data/postgres
	@docker compose --project-directory ./ -f ./ci/compose/quick-start-postgres.yaml up --force-recreate --remove-orphans

swaggo-gen:
	export PATH=$PATH:$HOME/go/bin 
	swag init --parseDependency true