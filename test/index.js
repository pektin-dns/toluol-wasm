import * as toluol from "../pkg/toluol_wasm";
const f = fetch;

const publicResolvers = [
    "https://cloudflare-dns.com",
    "https://dns.digitale-gesellschaft.ch",
    "https://google.dns",
    "http://[::]"
];

const resolver = publicResolvers[3];

const post = async query => {
    const res = await f(`${resolver}/dns-query`, {
        headers: {
            "content-type": "application/dns-message",
            authorization:
                "Basic Um8tdjZCcTFPcG9fWFNlSnJGWmxFak1sSF9FOjAzTFU4UTE5NUdBaEF1V0VzaF96YklfSGI3S2dOS3YxZXZFQ25hdjNTZHRYNkhEVUJfTWdlb09obnIxRlY1UVAyWTUyWUdjOWVWMG5LaUJFdUxwLTZyeVFtYVktVFA3di1HQjFUMVJ5bV9GNWZfc3RqUVlOUDgzZGVGU2JqbUpfdlJkNUh3"
        },
        credentials: "omit",
        method: "POST",
        body: query
    });
    return new Uint8Array(await res.arrayBuffer());
};

const get = async query => {
    const q = Buffer.from(query).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");

    const res = await f(`${resolver}/dns-query?dns=${q.replace(/=/g, "")}`, {
        headers: {
            accept: "application/dns-message",
            authorization:
                "Basic Um8tdjZCcTFPcG9fWFNlSnJGWmxFak1sSF9FOjAzTFU4UTE5NUdBaEF1V0VzaF96YklfSGI3S2dOS3YxZXZFQ25hdjNTZHRYNkhEVUJfTWdlb09obnIxRlY1UVAyWTUyWUdjOWVWMG5LaUJFdUxwLTZyeVFtYVktVFA3di1HQjFUMVJ5bV9GNWZfc3RqUVlOUDgzZGVGU2JqbUpfdlJkNUh3"
        },
        credentials: "omit"
    });
    return new Uint8Array(await res.arrayBuffer());
};

(async () => {
    toluol.init_panic_hook();

    const query = toluol.new_query("y.gy", "NSEC");

    const res = await get(query);
    const parsed = toluol.parse_answer(res);
    console.log(parsed);
})();
