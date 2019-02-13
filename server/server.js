const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const PORT = 3477;
const apiKey = 'Bearer eyJrIjoiME9ZUTE5SzZDcDdRMkgzWmQ3MW1MdldIeTNPRkVOd3EiLCJuIjoidGVzdGluZyIsImlkIjoxfQ==';
const grafurl = 'http://35.232.120.147/api/datasources/proxy/1/api/v1/query_range?';

const data = [
    { time: 1, pods: 3 },
    { time: 2, pods: 2 },
    { time: 3, pods: 3 },
    { time: 4, pods: 1 },
    { time: 5, pods: 2 },
    { time: 6, pods: 3 },
    { time: 7, pods: 4 },
    { time: 8, pods: 3 }
]

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome back Aetos working with jarvis');
});


app.get('/nodecount', (req, res) => {
    let newUrl = grafurl + 'query=:kube_pod_info_node_count:&start=1549989960&end=1550011590&step=30';
    let encodedUrl = encodeURI(newUrl);
    console.log(newUrl);
    //let encodeurl = encodeURI('http://35.232.120.147/api/datasources/proxy/1/v1/query_range?query=:kube_pod_info_node_count:&start=1550011580&end=1550011590&step=30');
    console.log(encodedUrl);
    request({
        headers: {
          'Accept': 'application/json',
          'Authorization': apiKey,
        },
        //uri: grafurl+'/api/datasources/proxy/1/api/v1/query_range?query=%3Akube_pod_info_node_count%3A&start=1549989960&end=1550011590&step=30',
        uri: encodedUrl,
        method: 'GET'
      }, function (err, response, body) {
          let jsonBody = JSON.parse(body)
          console.log(jsonBody.data.result[0].values);
          res.json(JSON.parse(body));
      });
  });

app.get('/cpuusage', (req, res) => {
    request({
        headers: {
          'Accept': 'application/json',
          'Authorization': apiKey,
        },
        uri: "http://35.232.120.147/api/datasources/proxy/1/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D%5B3m%5D))&start=1550006160&end=1550027790&step=30",
        method: 'GET'
      }, function (err, response, body) {
          console.log(JSON.parse(body));
          res.json(JSON.parse(body));
      });

});

app.get('/memusage', (req, res) => {
    request({
        headers: {
            'Accept': 'application/json',
            'Authorization': apiKey,
          },
          uri: "http://35.232.120.147/api/datasources/proxy/1/api/v1/query_range?query=sum(container_memory_usage_bytes%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D)%20%2F%201024%5E3&start=1550010690&end=1550032320&step=30",
          method: 'GET'
        }, function (err, response, body) {
            console.log(JSON.parse(body));
            res.json(JSON.parse(body));
    });
});

app.get('/networktraffic', (req, res) => {
    request({
        headers: {
            'Accept': 'application/json',
            'Authorization': apiKey,
          },
          uri: "http://35.232.120.147/api/datasources/proxy/1/api/v1/query_range?query=sum(rate(container_network_transmit_bytes_total%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D%5B3m%5D))%20%2B%20sum(rate(container_network_receive_bytes_total%7Bnamespace%3D%22default%22%2Cpod_name%3D~%22frontend.*%22%7D%5B3m%5D))&start=1550011560&end=1550033190&step=30",
          method: 'GET'
        }, function (err, response, body) {
            console.log(JSON.parse(body));
            res.json(JSON.parse(body));
    });
});

app.get('/data', (req, res) => {
    res.json(data);
});

app.listen(PORT, () => console.log(`AETOS node server is listening on PORT: ${PORT}`));
