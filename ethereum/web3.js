import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Use the web3 instance injected by the browser
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Fallback to a default provider (optional)
  const provider = new Web3.providers.HttpProvider(
    'url' // Replace with your Infura URL
  );
  web3 = new Web3(provider);
}

export default web3;
