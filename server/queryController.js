const request = require("request");
// const apiKey = process.env.API_KEY;
// const grafurl = process.env.API_URL;
const apiKey =
  "Bearer eyJrIjoiYmFnUmh5STVRM0xZTnljcDB4aGJ5akpsanRsa0M3RWMiLCJuIjoiYWRnZW5rZXkiLCJpZCI6MX0=";
const grafurl =
  "http://35.232.120.147/api/datasources/proxy/1/api/v1/query_range?";

const reqHeader = {
  Accept: "application/json",
  Authorization: apiKey
};
queryController = {};

queryController.getCpu = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr =
    "sum(rate(container_cpu_usage_seconds_total%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D%5B3m%5D))";
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

queryController.getNetworkTraffic = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr =
    'sum(rate(container_network_transmit_bytes_total{namespace="default",pod_name=~"frontend.*"}[3m]))%20%2B%20sum(rate(container_network_receive_bytes_total{namespace="default",pod_name=~"frontend.*"}[3m]))';
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

queryController.getMemUsage = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr =
    "sum(container_memory_usage_bytes%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D)%20%2F%201024%5E3";
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

queryController.getNodeCount = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr = ":kube_pod_info_node_count:";
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

queryController.getCpuUtilization = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr =
    'sum(rate(node_cpu{mode!="idle",mode!="iowait",mode!~"^(?:guest.*)$"}[5m])) BY (instance)';
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

queryController.getSaturation = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr =
    'sum(node_load1) by (node) / count(node_cpu{mode="system"}) by (node) * 100';
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

queryController.getMemoryUtilization = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr =
    "1 - sum(node_memory_MemAvailable) by (node) / sum(node_memory_MemTotal) by (node)";
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

queryController.getNetworkSaturation = (req, res, next) => {
  let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
  let endTime = Math.floor(Date.now() / 1000);
  let step = 30;
  let queryStr =
    "sum(rate(node_network_receive_bytes[5m])) by (node) %20%2B%20 sum(rate(node_network_transmit_bytes[5m])) by (node)";
  let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
  request(
    {
      headers: reqHeader,
      uri: urlVal,
      method: "GET"
    },
    function(err, response, body) {
      res.locals = JSON.parse(body);
      next();
    }
  );
};

module.exports = queryController;
