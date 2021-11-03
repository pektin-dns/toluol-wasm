mkdir pkg
docker run --env UID=$(id -u) --env GID=$(id -g) --name wasm-build --mount "type=bind,source=$PWD/pkg/,dst=/pkg/" -it $(docker build -q .)

