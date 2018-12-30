import axios from 'axios';


export const getConsumers = (type) => {
    return axios.get('/api/consumers/'+ (type != null && type !== '' ? type : ''))
        .then(response => response.data)
}


export const createConsumer = (data) => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: JSON.stringify(data),
        url: '/api/consumer/',
    };

    return axios(options)
        .then(response => response.data)
}

export const removeConsumer = (id) => {
    return axios.delete('/api/consumer/'+id)
        .then(response => response.data)
}

export const getStatistics = (consumer, years) => {
    return axios.get('/api/monthly_statistics/'+consumer,
        years? {params: {year: years[0]}} : null)
        .then(response => response.data);
}



export const consumerTypes = [
    {id: 'low', label: 'LABEL.CONSUMERTYPE.LOW'},
    {id: 'high', label: 'LABEL.CONSUMERTYPE.HIGH'},
    {id: 'extra_high', label: 'LABEL.CONSUMERTYPE.EXTRAHIGH'}
];

export const getConsumerTypes = () => {
    return Promise.resolve(consumerTypes);
}