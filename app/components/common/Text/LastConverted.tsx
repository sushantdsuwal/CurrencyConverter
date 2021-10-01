import moment from 'moment';
import PropTypes from 'prop-types';

import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

interface LastConverted {
  date?: Date;
  base: string;
  quote: string;
  conversionRate: string | number;
}

const LastConverted = ({
  date,
  base,
  quote,
  conversionRate,
}: LastConverted): JSX.Element => (
  <Text style={styles.smallText}>
    1 {base} = {conversionRate} {quote} as of{' '}
    {moment(date).format('MMMM D, YYYY')}
  </Text>
);

LastConverted.propTypes = {
  date: PropTypes.object,
  base: PropTypes.string,
  quote: PropTypes.string,
  conversionRate: PropTypes.number,
};

export default LastConverted;
