import express from "express";
import bodyParser from "body-parser";
import { randomUUID } from "crypto";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const free = +(Math.random() * 500).toFixed(2); // 随机生成一个数字，表示当前未使用的内存容量
const usage = +(Math.random() * 500).toFixed(2); // 随机生成一个数字，标识当前已使用的内存容量

/**
 * v1，直接返回数字
 */
app.get("/api/v1/memory/free", function (req, res) {
  return res.json(free);
});

app.get("/api/v1/memory/usage", function (req, res) {
  return res.json(usage);
});

/**
 * v1 => v2，数据格式改变
 */
app.get("/api/v2/memory/free", function (req, res) {
  const requestId = randomUUID();
  return res.json({ requestId, data: { free } });
});

app.get("/api/v2/memory/usage", function (req, res) {
  const requestId = randomUUID();
  return res.json({ requestId, data: { usage } });
});

/**
 * v2 => v3，调用方式改变
 */
app.get("/api/v3/memory", function (req, res) {
  const requestId = randomUUID();
  return res.json({ requestId, data: { free, usage } });
});

const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
