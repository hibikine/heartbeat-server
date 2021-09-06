import { serve } from "https://deno.land/std@0.106.0/http/server.ts";
import { readAll } from "https://deno.land/std@0.106.0/io/util.ts";

const PORT = parseInt(Deno.env.get("HEARTBEAT_PORT") ?? "8162", 10);
const s = serve({ port: PORT });

console.log(` Listening on <http://localhost>:${PORT}/`);

let currentHeartbeat = 0;

for await (const req of s) {
  if (req.url !== "/heartbeat") {
    continue;
  }

  if (req.method === "GET") {
    req.respond({ body: `${currentHeartbeat}` });
  } else if (req.method === "POST") {
    try {
      const body = new TextDecoder().decode(await readAll(req.body));
      const value = parseInt(body, 10);
      if (value > 20 && value < 300) {
        currentHeartbeat = value;
        req.respond({ body: "OK" });
        continue;
      }
      req.respond({ body: "Invalid value" });
      continue;
    } catch (e) {
      console.error(e);
      req.respond({ body: "Error parsing request body" });
      continue;
    }
  }
}
