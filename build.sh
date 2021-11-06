wasm-pack build
wasm-opt -Oz -o pkg/toluol_wasm_bg.wasm pkg/toluol_wasm_bg.wasm
du -hs pkg/