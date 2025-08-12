import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/color';

interface Props {
  balance: number;
  currency?: string;
}

const BalanceCard: React.FC<Props> = ({ balance, currency = '₺' }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Mevcut Bakiye</Text>
      <Text style={styles.amount}>
        {currency} {balance.toFixed(2)}
      </Text>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 12,
    marginVertical: 16,
  },
  label: {
    color: '#ffffffaa',
    fontSize: 14,
    marginBottom: 6,
  },
  amount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
