const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios, { delayResponse: 2000 });
let baseId=10;

const baseConsumers = [
    {
        "id": 1,
        "name": "Jim Bond",
        "consumer_type": "extra_high"
    },
    {
        "id": 2,
        "name": "Dianne King",
        "consumer_type": "high"
    },
    {
        "id": 3,
        "name": "Julia Miller",
        "consumer_type": "low"
    },
    {
        "id": 4,
        "name": "Cameron Hamilton",
        "consumer_type": "low"
    },
    {
        "id": 5,
        "name": "Rose Martin",
        "consumer_type": "low"
    },
    {
        "id": 6,
        "name": "John Oliver",
        "consumer_type": "low"
    },
    {
        "id": 7,
        "name": "Adam Oliver",
        "consumer_type": "low"
    },
    {
        "id": 8,
        "name": "Dianne Rees",
        "consumer_type": "extra_high"
    },
    {
        "id": 9,
        "name": "Charles Walsh",
        "consumer_type": "low"
    },
    {
        "id": 10,
        "name": "Mary Hamilton",
        "consumer_type": "low"
    }
];




const statistics = [
    {
        "id": 1,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 1,
        "consumption": 6100.0,
        "total_bill": 891.8199999999999,
        "total_cost": 912.5600000000001
    },
    {
        "id": 2,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 2,
        "consumption": 9500.0,
        "total_bill": 1405.05,
        "total_cost": 1453.5000000000002
    },
    {
        "id": 3,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 3,
        "consumption": 9500.0,
        "total_bill": 1324.3,
        "total_cost": 1453.5000000000002
    },
    {
        "id": 4,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 4,
        "consumption": 6000.0,
        "total_bill": 836.4,
        "total_cost": 928.2
    },
    {
        "id": 5,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 5,
        "consumption": 6700.0,
        "total_bill": 911.2,
        "total_cost": 945.37
    },
    {
        "id": 6,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 6,
        "consumption": 8900.0,
        "total_bill": 1437.3500000000001,
        "total_cost": 1437.3500000000001
    },
    {
        "id": 7,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 7,
        "consumption": 5400.0,
        "total_bill": 798.66,
        "total_cost": 780.3000000000001
    },
    {
        "id": 8,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 8,
        "consumption": 5300.0,
        "total_bill": 819.91,
        "total_cost": 882.98
    },
    {
        "id": 9,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 9,
        "consumption": 8000.0,
        "total_bill": 1128.8,
        "total_cost": 1115.2
    },
    {
        "id": 10,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 10,
        "consumption": 9000.0,
        "total_bill": 1224.0,
        "total_cost": 1315.8
    },
    {
        "id": 11,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 11,
        "consumption": 9400.0,
        "total_bill": 1310.36,
        "total_cost": 1438.2000000000003
    },
    {
        "id": 12,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2016,
        "month": 12,
        "consumption": 5500.0,
        "total_bill": 776.0500000000001,
        "total_cost": 813.45
    },
    {
        "id": 13,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 1,
        "consumption": 7100.0,
        "total_bill": 1001.8100000000001,
        "total_cost": 989.74
    },
    {
        "id": 14,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 2,
        "consumption": 6600.0,
        "total_bill": 1065.9,
        "total_cost": 908.8200000000002
    },
    {
        "id": 15,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 3,
        "consumption": 8600.0,
        "total_bill": 1169.6000000000001,
        "total_cost": 1169.6000000000001
    },
    {
        "id": 16,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 4,
        "consumption": 7400.0,
        "total_bill": 1044.14,
        "total_cost": 1081.8799999999999
    },
    {
        "id": 17,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 5,
        "consumption": 6500.0,
        "total_bill": 1016.6,
        "total_cost": 1005.5500000000001
    },
    {
        "id": 18,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 6,
        "consumption": 5500.0,
        "total_bill": 878.9,
        "total_cost": 860.2
    },
    {
        "id": 19,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 7,
        "consumption": 9700.0,
        "total_bill": 1566.55,
        "total_cost": 1401.65
    },
    {
        "id": 20,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 8,
        "consumption": 7900.0,
        "total_bill": 1275.8500000000001,
        "total_cost": 1195.2700000000002
    },
    {
        "id": 21,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 9,
        "consumption": 8800.0,
        "total_bill": 1466.08,
        "total_cost": 1271.6000000000001
    },
    {
        "id": 22,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 10,
        "consumption": 9000.0,
        "total_bill": 1438.2,
        "total_cost": 1499.4
    },
    {
        "id": 23,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 11,
        "consumption": 8400.0,
        "total_bill": 1256.64,
        "total_cost": 1299.48
    },
    {
        "id": 24,
        "consumer": {
            "id": 1,
            "name": "Jim Bond",
            "consumer_type": "extra_high"
        },
        "year": 2017,
        "month": 12,
        "consumption": 8100.000000000001,
        "total_bill": 1170.4500000000003,
        "total_cost": 1280.6100000000004
    }
];

let consumers = [].concat(baseConsumers.map(x =>(Object.assign({},x))));
const consumerTypes= ['high','extra_high','low'];

mock.onGet(/\/api\/consumers\/[high|extra_high|low]?/).reply(function(config){
    const consumerType= config.url.split('/').slice(3)[0];
    return [200, consumerType ? consumers.filter(x => x.consumer_type === consumerType) : consumers];
});

mock.onPost(/\/api\/consumer\//).reply(function(config){
    let data;
    try{
        data=JSON.parse(config.data);
    }catch(_){
        return [400, 'Bad request'];
    }
    const {name, consumer_type} = data;

    if (consumerTypes.findIndex(x => x === consumer_type)<0){
        return [400, 'Consumer Type is invalid'];
    }
    if (name == null || name === ''){
        return [400, 'Consumer Name is invalid'];
    }
    consumers.push({name, consumer_type, id: ++baseId})

    return [200, {success:true}];
});

mock.onDelete(/\/api\/consumer\/\d+?/).reply(function(config){
    const id= config.url.split('/').slice(3)[0];
    consumers=consumers.filter(x => x.id !== parseInt(id));
    return [200, {success:true}];
});

mock.onGet(/\/api\/monthly_statistics\/\d+?/).reply(function(config){
    //const consumerId= config.url.split('/').slice(3)[0];
    const year= config.params ?  config.params.year : null;
    return [200, year ? statistics.filter(x => x.year === parseInt(year)) : statistics];
});