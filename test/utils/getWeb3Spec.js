import getWeb3 from '../../src/utils/getWeb3';

// import { getOne } from '../helpers';

describe('getWeb3', () => {
  it('Should resolve to either currentProvider or muggle mode', () => {
    // getWeb3.then(results => console.log(results));
    assert.ok(
      getWeb3.then(results => {
        results;
      })
    );
  });
});
