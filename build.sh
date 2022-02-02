wasm-pack build --release --target web --out-dir dist/web
wasm-opt -Oz -o dist/web/toluol_wasm_bg.wasm dist/web/toluol_wasm_bg.wasm
sed -i "s|toluol-wasm|@pektin/toluol-wasm-web|g" dist/web/package.json

wasm-pack build --release --target nodejs --out-dir dist/nodejs
wasm-opt -Oz -o dist/nodejs/toluol_wasm_bg.wasm dist/nodejs/toluol_wasm_bg.wasm
sed -i "s|toluol-wasm|@pektin/toluol-wasm-nodejs|g" dist/nodejs/package.json

wasm-pack build --release --target bundler --out-dir dist/bundler
wasm-opt -Oz -o dist/bundler/toluol_wasm_bg.wasm dist/bundler/toluol_wasm_bg.wasm
sed -i "s|toluol-wasm|@pektin/toluol-wasm-bundler|g" dist/bundler/package.json
