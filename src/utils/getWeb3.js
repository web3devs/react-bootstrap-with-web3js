import Web3 from '../../node_modules/web3';

const getWeb3 = new Promise(resolve => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let results;
    let fallback = 'muggle mode';
    let web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3
      };

      console.log('Injected web3 detected.');

      resolve(results);
    } else {
      // HACK: reworked getWeb3 results in order to fit my idea of practical.
      // Fallback to web3 === undefined in order to display UI components to
      // the muggles.
      // let provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      //
      // web3 = new Web3(provider);

      results = {
        fallback
      };
      console.log(
        'No web3 instance injected, present components in muggle mode.'
      );
      resolve(results);
    }
  });
});

export default getWeb3;
