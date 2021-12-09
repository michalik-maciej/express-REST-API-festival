const axios = require('axios');

const something = async () => {
  try {
    const fetchCoins = () => axios.post(`https://api.blocktap.io/graphql`)
    const res = await fetchCoins()
    console.log(res.json())
  }
  catch (err) {
    console.log('error axios: ', err)
  }
}

something()

/* const https = require('https');

const QUERY = `
  query MarketCapRank {
    assets(filter: {marketCapRank: {_lte: 10}}, sort: {marketCapRank: ASC}) {
      assetName
    }
  }
`;
  
const VARS = {
  symbol: 'binance',
};
const content = JSON.stringify({ query: QUERY, variables: VARS });

const req = https.request(
  {
    host: 'api.blocktap.io',
    path: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': content.length,
      Authorization: 'Bearer 580bb9eda9a36ca6bf78c9c8ee6c0f2ec5ad00b1cd1a29f1f3c3c70db376ee4f',
    },
  },
  res => {
    if (res.statusCode !== 200) {
      console.log(`Failed with statusCode ${res.statusCode}`);
      return;
    }
    let buffers = [];
    res.on('data', buffer => buffers.push(buffer));
    res.on('end', () => {
      let result = Buffer.concat(buffers);
      console.log(JSON.parse(result));
    });
  }
);
req.write(content);
req.end(); */