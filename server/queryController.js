const request = require('request');

const apiKey = 'Bearer eyJrIjoiME9ZUTE5SzZDcDdRMkgzWmQ3MW1MdldIeTNPRkVOd3EiLCJuIjoidGVzdGluZyIsImlkIjoxfQ==';
const grafurl = 'http://35.232.120.147/api/datasources/proxy/1/api/v1/query_range?';

const reqHeader = {
        Accept : 'application/json',
        Authorization : apiKey
};
// start is six hours ago
let startTime = Math.floor((Date.now()/1000 - (3600*6)));
let endTime = Math.floor((Date.now()/1000));
let step = 30;
queryController = {};



queryController.getCpu = (req, res, next) => {
    let queryStr = 'sum(rate(container_cpu_usage_seconds_total%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D%5B3m%5D))'
    let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
    request({headers : reqHeader,
        uri: urlVal,
        method: 'GET'
      }, function (err, response, body) {
          res.locals = JSON.parse(body);
          next();
      });

}

queryController.getNetworkTraffic = (req, res, next) => {
    let queryStr = 'sum(rate(container_network_transmit_bytes_total{namespace="default",pod_name=~"frontend.*"}[3m]))%20%2B%20sum(rate(container_network_receive_bytes_total{namespace="default",pod_name=~"frontend.*"}[3m]))';
    let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
    let encoded = encodeURI(urlVal);
    request({headers : reqHeader,
        uri: urlVal,
        method: 'GET'
      }, function (err, response, body) {
          res.locals = JSON.parse(body);
          next();
      });

}

queryController.getMemUsage = (req, res, next) => {
    let queryStr = 'sum(container_memory_usage_bytes%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D)%20%2F%201024%5E3';
    let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
    request({headers : reqHeader,
        uri: urlVal,
        method: 'GET'
      }, function (err, response, body) {
          res.locals = JSON.parse(body);
          next();
      });

}

queryController.getNodeCount = (req, res, next) => {
    let queryStr = ':kube_pod_info_node_count:';
    let urlVal = `${grafurl}query=${queryStr}&start=${startTime}&end=${endTime}&step=${step}`;
    request({headers : reqHeader,
        uri: urlVal,
        method: 'GET'
      }, function (err, response, body) {
          res.locals = JSON.parse(body);
          next();
      });

}


module.exports = queryController;











