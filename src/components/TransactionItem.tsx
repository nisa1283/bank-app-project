import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TransactionItemProps = {
  title: string;
  date: string;
  amount: number;
  isIncome: boolean;
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  date,
  amount,
  isIncome,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={[
          styles.amount,
          { color: isIncome ? '#28a745' : '#dc3545' }
        ]}>
          {isIncome ? '+' : '-'}₺{amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 4,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionItem;