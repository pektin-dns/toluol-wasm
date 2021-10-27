mod utils;
use std::str::FromStr;

use wasm_bindgen::prelude::*;

use std::io::Cursor;
use toluol::{DnsFlags, DnsMessage, DnsOpcode, DnsType};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn query(domain: &str, qtype: &str) -> Vec<u8> {
    return DnsMessage::new_query(
        domain,
        DnsType::from_str(qtype).unwrap(),
        DnsOpcode::QUERY,
        DnsFlags::new(false, false, true, false, true, true),
        false,
        false,
        4096,
    )
    .expect("error creating query")
    .encode()
    .expect("error encoding query");
}

#[wasm_bindgen]
pub fn parse_answer(answer: Vec<u8>) -> String {
    DnsMessage::parse(&mut Cursor::new(&answer))
        .expect("error parsing answer")
        .to_string()
}
