import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/color';

interface Props {
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  backgroundColor?: string;
}

const CardItem: React.FC<Props> = ({ cardHolder, cardNumber, expiry, backgroundColor = '#5A31F4' }) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.number}>{cardNumber}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>{cardHolder}</Text>
        <Text style={styles.label}>{expiry}</Text>
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    width: 260,
  },
  number: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
});
