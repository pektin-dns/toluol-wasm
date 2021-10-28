import * as toluol from "../pkg/wasm_dns";
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
            "content-type": "application/dns-message"
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
            accept: "application/dns-message"
        },
        credentials: "omit"
    });
    return new Uint8Array(await res.arrayBuffer());
};

(async () => {
    toluol.init_panic_hook();

    const query = toluol.new_query("y.gy", "A");

    const res = await get(query);
    const parsed = toluol.parse_answer(res);
    console.log(parsed);
})();
