# Heartbeat Server

## run 
```
deno run --allow-net --allow-env ./index.ts

#/w port
HEARTBEAT_PORT=8888 deno run --allow-net --allow-env ./index.ts
```

## test
```
deno run --allow-net --allow-env ./index.ts
curl localhost:8162/heartbeat
# 0
curl -X POST --data "126" localhost:8162/heartbeat
# OK
curl localhost:8162/heartbeat
# 126
```