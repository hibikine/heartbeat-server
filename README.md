# Heartbeat Server

This is just a real-time heartbeat register server running on Deno.

リアルタイムでPOSTで心拍数を受信して、その心拍数を返すだけのサーバーです。

## run 
```
deno run --allow-net --allow-env ./index.ts

#/w port
HEARTBEAT_PORT=8888 deno run --allow-net --allow-env ./index.ts
```

## usage
```
deno run --allow-net --allow-env ./index.ts
curl localhost:8162/heartbeat
# 0
curl -X POST --data "126" localhost:8162/heartbeat
# OK
curl localhost:8162/heartbeat
# 126
```
