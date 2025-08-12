import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const faturaKategorileri = [
  { id: '1', name: 'Elektrik', icon: 'zap', color: '#ff6b35' },
  { id: '2', name: 'Su', icon: 'droplet', color: '#4285f4' },
  { id: '3', name: 'Doğalgaz', icon: 'wind', color: '#34a853' },
  { id: '4', name: 'Telefon', icon: 'phone', color: '#ea4335' },
  { id: '5', name: 'İnternet', icon: 'wifi', color: '#9c27b0' },
  { id: '6', name: 'Kredi Kartı', icon: 'credit-card', color: '#ff9800' },
];

const BillScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [faturaKodu, setFaturaKodu] = useState('');
  const [tutar, setTutar] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'warning' | 'confirm' | 'success'>('warning');
  const [modalMessage, setModalMessage] = useState('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleFaturaOde = () => {
    if (!selectedCategory || !faturaKodu || !tutar) {
      setModalType('warning');
      setModalMessage('Lütfen tüm alanları doldurun.');
      setModalVisible(true);
      return;
    }

    const selectedCategoryName = faturaKategorileri.find(
      cat => cat.id === selectedCategory
    )?.name;

    setModalType('confirm');
    setModalMessage(
      `${selectedCategoryName} faturası\nFatura Kodu: ${faturaKodu}\nTutar: ${tutar} TL\n\nÖdemeyi onaylıyor musunuz?`
    );
    setModalVisible(true);
  };

  const handleConfirmPayment = () => {
    setModalType('success');
    setModalMessage('Fatura ödemesi tamamlandı!');
  };

  const closeModal = () => {
    if (modalType === 'success') {
      setModalVisible(false);
      navigation.goBack();
    } else {
      setModalVisible(false);
    }
  };

  return (
    <MainScreen
      showHeader
      title="Fatura Öde"
      onLeftPress={() => navigation.goBack()}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {/* Fatura Kategorileri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fatura Kategorisi Seçin</Text>
          <View style={styles.categoriesGrid}>
            {faturaKategorileri.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => handleCategorySelect(category.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Icon name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fatura Bilgileri */}
        {selectedCategory && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fatura Bilgileri</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Fatura Kodu / Abone No</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Fatura kodunu giriniz"
                value={faturaKodu}
                onChangeText={setFaturaKodu}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tutar (TL)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="0.00"
                value={tutar}
                onChangeText={setTutar}
                keyboardType="numeric"
              />
            </View>

            {/* Ödeme Butonu */}
            <TouchableOpacity 
              style={styles.payButton}
              onPress={handleFaturaOde}
            >
              <Icon name="credit-card" size={20} color="#fff" />
              <Text style={styles.payButtonText}>Fatura Öde</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Önceki Ödemeler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Ödemeler</Text>
          <View style={styles.paymentHistory}>
            <View style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Icon name="zap" size={16} color="#ff6b35" />
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyTitle}>Elektrik Faturası</Text>
                <Text style={styles.historyDate}>15 Temmuz 2025</Text>
              </View>
              <Text style={styles.historyAmount}>245.50 TL</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === 'warning'
                ? 'Uyarı'
                : modalType === 'confirm'
                ? 'Fatura Ödeme Onayı'
                : 'Başarılı'}
            </Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <View style={styles.modalButtons}>
              {modalType === 'confirm' ? (
                <>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    onPress={closeModal}
                  >
                    <Text style={styles.modalButtonText}>İptal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#5416ac' }]}
                    onPress={handleConfirmPayment}
                  >
                    <Text style={styles.modalButtonText}>Onayla</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#5416ac' }]}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>Tamam</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </MainScreen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 16 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f8f9fa',
    marginBottom: 12,
  },
  selectedCategory: { borderColor: '#5416ac', backgroundColor: '#5416ac10' },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: { fontSize: 14, fontWeight: '500', color: '#333', textAlign: 'center' },
  inputContainer: { marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 8 },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  payButton: {
    backgroundColor: '#5416ac',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  paymentHistory: { gap: 12 },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyDetails: { flex: 1 },
  historyTitle: { fontSize: 14, fontWeight: '500', color: '#333' },
  historyDate: { fontSize: 12, color: '#666', marginTop: 2 },
  historyAmount: { fontSize: 14, fontWeight: '600', color: '#5416ac' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  modalMessage: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', gap: 10 },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: '600' },
});

export default BillScreen;
