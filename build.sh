wasm-pack build
wasm-opt -Oz -o pkg/wasm_dns_bg.wasm pkg/wasm_dns_bg.wasm
du -hs pkg/