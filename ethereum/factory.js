import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// Check if CampaignFactory.abi is a string, if so, parse it
const abi =
  typeof CampaignFactory.abi === 'string'
    ? JSON.parse(CampaignFactory.abi)
    : CampaignFactory.abi;

const instance = new web3.eth.Contract(
  abi,
  'account_address' // Replace with the deployed contract address
);

export default instance;
