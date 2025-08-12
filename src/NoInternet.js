import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert, ActivityIndicator, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NoInternet = ({ onConnectionRestored }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const checkConnection = async () => {
    setIsRetrying(true);
    // onConnectionRestored fonksiyonunu çağır ve dönüş değerini bekle.
    // Bu değer, internet bağlantısının başarılı olup olmadığını belirleyecek.
    const success = await onConnectionRestored();

    if (success) {
      // Bağlantı başarılıysa, başka bir şey yapmaya gerek yok.
      // App.tsx'deki state güncellenecek ve ekran otomatik olarak değişecek.
      console.log('Bağlantı başarıyla sağlandı.');
    } else {
      Alert.alert('Bağlantı Yok', 'Hala internet bağlantınız yok.');
    }
    setIsRetrying(false);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📶</Text>
      <Text style={styles.title}>İnternet Bağlantısı Yok</Text>
      <Text style={styles.message}>
        Bu uygulamayı kullanmak için internet bağlantısına ihtiyacınız var.
      </Text>

      <TouchableOpacity
        style={[styles.retryButton, isRetrying && styles.disabledButton]}
        onPress={checkConnection}
        disabled={isRetrying}
      >
        {isRetrying ? <ActivityIndicator color="white" /> : <Text style={styles.retryButtonText}>Tekrar Dene</Text>}
      </TouchableOpacity>

      {Platform.OS === 'android' && (
        <TouchableOpacity style={styles.exitButton} onPress={() => BackHandler.exitApp()}>
          <Text style={styles.exitButtonText}>Uygulamayı Kapat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  icon: { fontSize: 80, opacity: 0.3, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 40, color: '#666' },
  retryButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, minWidth: 200, alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' },
  retryButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  exitButton: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 10, minWidth: 200, marginTop: 15 },
  exitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});

export default NoInternet;
