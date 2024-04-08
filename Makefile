
builder:
	@go build -ldflags="-w -s -X main.VERSION=$${version:?}" . 
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

doc-gen:
	export PATH=$PATH:$HOME/go/bin
	swag fmt
	swag init --generalInfo=./pkg/api/routers/publicApi.go --parseDependency=true
	cd ./client && orval
	cd ..

docker-run:
	docker run --rm -it -p 8081:8081 -p 8080:8080 -p 8079:8079  $$(docker build -q -f ./ci/docker/Dockerfile . --build-arg API_VERSION=1.0.0)