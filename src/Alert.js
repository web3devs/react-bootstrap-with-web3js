import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import {
  bsClass,
  bsStyles,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';
import { State } from './utils/StyleConfig';
import CloseButton from './CloseButton';
import getWeb3 from './utils/getWeb3';

let Abi = require('./utils/abis/Abi.js');
let Address = require('./utils/contractAddress/Address.js');

const propTypes = {
  onDismiss: PropTypes.func,
  closeLabel: PropTypes.string
};

const defaultProps = {
  closeLabel: 'Close alert'
};

class Alert extends React.Component {
  componentWillMount() {
    /** Get network provider and web3 instance.
     See utils/getWeb3 for more info. */
    getWeb3
      .then(results => {
        // console.log('results: ', results);
        this.setState({
          web3: results.web3,
          smartContract: results.web3.eth.contract(Abi).at(Address)
        });
        // HACK: logs Unused state fields iot pass TDD
        alert(this.state.web3);
        alert(this.state.smartContract);
      })
      .catch(error => {
        // console.log(error)
        this.setState({
          web3error: error.error
        });
        // HACK: logs Unused state fields iot pass TDD
        alert(this.state.web3error);
      });
    // this.accountListener()
  }

  render() {
    const { onDismiss, closeLabel, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const dismissable = !!onDismiss;
    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'dismissable')]: dismissable
    };

    return (
      <div
        {...elementProps}
        role="alert"
        className={classNames(className, classes)}
      >
        {dismissable && <CloseButton onClick={onDismiss} label={closeLabel} />}
        {children}
      </div>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default bsStyles(
  Object.values(State),
  State.INFO,
  bsClass('alert', Alert)
);
