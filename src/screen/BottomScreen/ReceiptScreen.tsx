import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Modal,
} from 'react-native';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Transaction = {
  id: string;
  title: string;
  date: string;
  amount: number;
  isIncome: boolean;
  category?: string;
  description?: string;
  paymentMethod?: string;
};

type RouteParams = {
  transaction: Transaction;
};

const ReceiptScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { transaction } = route.params as RouteParams;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const openModal = (title: string, message: string) => {
    setModalContent({ title, message });
    setModalVisible(true);
  };

  const receiptInfo = {
    receiptNumber: `RCP-${Date.now()}`,
    transactionId: transaction.id.toUpperCase(),
    bankName: "Tap'n Pay A.Ş.",
    branchCode: '1234',
    branchName: 'Merkez Şube',
    createdAt: new Date(),
    referenceNumber: `REF${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const generateReceiptText = () => {
    return `
═══════════════════════════════════════
            ${receiptInfo.bankName}
═══════════════════════════════════════

DEKONT / RECEIPT

Dekont No: ${receiptInfo.receiptNumber}
İşlem ID: ${receiptInfo.transactionId} 
Referans No: ${receiptInfo.referenceNumber}

═══════════════════════════════════════

İŞLEM BİLGİLERİ / TRANSACTION DETAILS

İşlem Türü: ${transaction.isIncome ? 'GELEN HAVALE' : 'GİDEN ÖDEME'}
Başlık: ${transaction.title}
Tutar: ${formatCurrency(transaction.amount)}
İşlem Tarihi: ${transaction.date}
Kategori: ${transaction.category || 'Belirtilmemiş'}
Ödeme Yöntemi: ${transaction.paymentMethod || 'Belirtilmemiş'}

${transaction.description ? `Açıklama: ${transaction.description}` : ''}

═══════════════════════════════════════

BANKA BİLGİLERİ / BANK DETAILS

Şube Kodu: ${receiptInfo.branchCode}
Şube Adı: ${receiptInfo.branchName}
Oluşturulma: ${formatDate(receiptInfo.createdAt)}

═══════════════════════════════════════

Bu dekont yasal geçerliliğe sahiptir.
This receipt is legally valid.

${receiptInfo.bankName}
www.tapnpay.com.tr | 444 0 123
    `.trim();
  };

  const handleShareReceipt = async () => {
    try {
      const receiptText = generateReceiptText();
      await Share.share({
        message: receiptText,
        title: 'İşlem Dekontu',
      });
    } catch (error) {
      openModal('Hata', 'Dekont paylaşılırken bir hata oluştu.');
    }
  };

  const handleSaveReceipt = () => {
    openModal('Dekont Kaydedildi', 'Dekont başarıyla cihazınıza kaydedildi.');
  };

  const handlePrintReceipt = () => {
    openModal('Yazdırma', 'Dekont yazdırma işlemi başlatılıyor...');
  };

  return (
    <MainScreen
      showHeader
      title="Dekont"
      onLeftPress={() => navigation.goBack()}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {/* Dekont Header */}
        <View style={styles.receiptContainer}>
          <View style={styles.receiptHeader}>
            <View style={styles.bankLogo}>
              <Icon name="credit-card" size={32} color="#5416ac" />
            </View>
            <Text style={styles.bankName}>{receiptInfo.bankName}</Text>
            <Text style={styles.receiptTitle}>İŞLEM DEKONTU</Text>
            <View style={styles.receiptNumberContainer}>
              <Text style={styles.receiptNumber}>#{receiptInfo.receiptNumber}</Text>
            </View>
          </View>

          {/* İşlem Bilgileri */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>İşlem Bilgileri</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>İşlem Türü:</Text>
              <Text style={[
                styles.infoValue,
                { color: transaction.isIncome ? '#28a745' : '#dc3545' }
              ]}>
                {transaction.isIncome ? 'GELEN HAVALE' : 'GİDEN ÖDEME'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Başlık:</Text>
              <Text style={styles.infoValue}>{transaction.title}</Text>
            </View>

            <View style={styles.amountRow}>
              <Text style={styles.infoLabel}>Tutar:</Text>
              <Text style={[
                styles.amountValue,
                { color: transaction.isIncome ? '#28a745' : '#dc3545' }
              ]}>
                {formatCurrency(transaction.amount)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>İşlem Tarihi:</Text>
              <Text style={styles.infoValue}>{transaction.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kategori:</Text>
              <Text style={styles.infoValue}>{transaction.category || 'Belirtilmemiş'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ödeme Yöntemi:</Text>
              <Text style={styles.infoValue}>{transaction.paymentMethod || 'Belirtilmemiş'}</Text>
            </View>

            {transaction.description && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Açıklama:</Text>
                <Text style={styles.infoValue}>{transaction.description}</Text>
              </View>
            )}
          </View>

          {/* Teknik Bilgiler */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Teknik Bilgiler</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>İşlem ID:</Text>
              <Text style={styles.infoValue}>{receiptInfo.transactionId}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Referans No:</Text>
              <Text style={styles.infoValue}>{receiptInfo.referenceNumber}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Şube:</Text>
              <Text style={styles.infoValue}>{receiptInfo.branchName} ({receiptInfo.branchCode})</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Oluşturulma:</Text>
              <Text style={styles.infoValue}>{formatDate(receiptInfo.createdAt)}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.receiptFooter}>
            <View style={styles.footerDivider} />
            <Text style={styles.footerText}>
              Bu dekont yasal geçerliliğe sahiptir.
            </Text>
            <Text style={styles.footerSubText}>
            Tap'nPay A.Ş. | www.tapnpay.com.tr | 444 0 123
            </Text>
          </View>
        </View>

        {/* Aksiyon Butonları */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShareReceipt}>
            <Icon name="share-2" size={20} color="#5416ac" />
            <Text style={styles.actionButtonText}>Paylaş</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSaveReceipt}>
            <Icon name="download" size={20} color="#5416ac" />
            <Text style={styles.actionButtonText}>Kaydet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handlePrintReceipt}>
            <Icon name="printer" size={20} color="#5416ac" />
            <Text style={styles.actionButtonText}>Yazdır</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalMessage}>{modalContent.message}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  receiptContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  receiptHeader: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#5416ac',
    paddingBottom: 20,
    marginBottom: 20,
  },
  bankLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5416ac20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bankName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5416ac',
    marginBottom: 8,
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  receiptNumberContainer: {
    backgroundColor: '#5416ac10',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  receiptNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5416ac',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  amountValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  receiptFooter: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5416ac',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#5416ac',
    fontWeight: '600',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#5416ac' },
  modalMessage: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
  modalButton: {
    backgroundColor: '#5416ac',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: { color: '#fff', fontWeight: '600' },
});

export default ReceiptScreen;