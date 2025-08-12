import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Feather';

const IBANDisplay = () => {
  const iban = 'TR00 0000 0000 0000 0000 0000 00';

  const handleCopy = () => {
    Clipboard.setString(iban);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>IBAN</Text>
      <View style={styles.row}>
        <Text style={styles.ibanText}>{iban}</Text>
        <TouchableOpacity onPress={handleCopy}>
          <Icon name="copy" size={18} color="#5416ac" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ibanText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
});

export default IBANDisplay;
