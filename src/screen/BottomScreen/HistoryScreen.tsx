import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native';
import { format, isToday, isYesterday, isWithinInterval, subDays, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import TransactionItem from '../../components/TransactionItem';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const { height: screenHeight } = Dimensions.get('window');

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

const HistoryScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const transactions: Transaction[] = [
     {
      id: 't12', 
      title: 'Trendyol', 
      date: '4 08 2025', 
      amount: 1777, 
      isIncome: false,
      category: 'Alışveriş',
      description: 'Online alışveriş - Giyim',
      paymentMethod: 'Kredi Kartı'

    },
    {
      id: 't11', 
      title: 'Trendyol', 
      date: '3 08 2025', 
      amount: 600.0, 
      isIncome: false,
      category: 'Alışveriş',
      description: 'Online alışveriş - Giyim',
      paymentMethod: 'Kredi Kartı'

    },
    { 
      id: 't10', 
      title: 'Trendyol', 
      date: '3 08 2025', 
      amount: 600.0, 
      isIncome: false,
      category: 'Alışveriş',
      description: 'Online alışveriş - Giyim',
      paymentMethod: 'Kredi Kartı'
    },
    { 
      id: 't9', 
      title: 'Spotify', 
      date: '4 08 2025', 
      amount: 60.0, 
      isIncome: false,
      category: 'Alışveriş',
      description: 'Kozmetik ürünleri',
      paymentMethod: 'Banka Kartı'
    },
    { 
      id: 't8', 
      title: 'Netflix', 
      date: '3 08 2025', 
      amount: 250.0, 
      isIncome: false,
      category: 'Eğlence',
      description: 'Aylık abonelik ücreti',
      paymentMethod: 'Kredi Kartı'
    },
    { 
      id: 't7', 
      title: 'Trendyol', 
      date: '3 08 2025', 
      amount: 170.0, 
      isIncome: false,
      category: 'Alışveriş',
      description: 'Elektronik aksesuarları',
      paymentMethod: 'Kredi Kartı'
    },
    { 
      id: 't6', 
      title: 'Amazon', 
      date: '26 07 2025', 
      amount: 120.0, 
      isIncome: false,
      category: 'Alışveriş',
      description: 'Kitap alışverişi',
      paymentMethod: 'Banka Kartı'
    },
    { 
      id: 't5', 
      title: 'Yemek Sepeti', 
      date: '25 07 2025', 
      amount: 89.5, 
      isIncome: false,
      category: 'Yemek',
      description: 'Online yemek siparişi',
      paymentMethod: 'Kredi Kartı'
    },
    { 
      id: 't4', 
      title: 'Spotify', 
      date: '24 07 2025', 
      amount: 29.99, 
      isIncome: false,
      category: 'Eğlence',
      description: 'Premium abonelik',
      paymentMethod: 'Kredi Kartı'
    },
    { 
      id: 't3', 
      title: 'Bonus', 
      date: '23 07 2025', 
      amount: 300, 
      isIncome: true,
      category: 'Gelir',
      description: 'Performans bonusu',
      paymentMethod: 'Banka Havalesi'
    },
    { 
      id: 't2', 
      title: 'Market', 
      date: '22 07 2025', 
      amount: 240.75, 
      isIncome: false,
      category: 'Market',
      description: 'Haftalık market alışverişi',
      paymentMethod: 'Banka Kartı'
    },
    { 
      id: 't1', 
      title: 'Maaş', 
      date: '21 07 2025', 
      amount: 5000, 
      isIncome: true,
      category: 'Gelir',
      description: 'Aylık maaş ödemesi',
      paymentMethod: 'Banka Havalesi'
    },
  ];

  // Tarih dönüşümü: '26 07 2025' -> Date objesi
  const parseDate = (dateStr: string) => {
    try {
      const parsed = parse(dateStr, 'dd MM yyyy', new Date());
      console.log(`Parsing date: ${dateStr} -> ${parsed}`);
      return parsed;
    } catch (error) {
      console.error('Date parsing error:', error, 'for date:', dateStr);
      return new Date(); // Fallback
    }
  };

  const today = new Date();

  const todayTx = transactions.filter((tx) => isToday(parseDate(tx.date)));
  const yesterdayTx = transactions.filter((tx) => isYesterday(parseDate(tx.date)));
   const recentTx = transactions.filter((tx) => {
    const txDate = parseDate(tx.date);
    const now = new Date();
    
    // Bugün ve dün değilse ve son 30 gün içindeyse
    if (isToday(txDate) || isYesterday(txDate)) {
      return false;
    }
    
    // Tarih farkını hesapla
    const diffTime = now.getTime() - txDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    console.log(`Transaction ${tx.title} - Date: ${tx.date}, Days ago: ${diffDays}`);
    
    return diffDays >= 0 && diffDays <= 30;
  });

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleGenerateReceipt = () => {
    if (!selectedTransaction) return;

    handleCloseModal();

    navigation.navigate('Receipt',{
      transaction: selectedTransaction
    });
  };

 const renderSection = (title: string, data: Transaction[]) => {
    if (data.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map((tx) => (
          <TouchableOpacity
            key={tx.id}
            onPress={() => handleTransactionPress(tx)}
            activeOpacity={0.7}
          >
            <TransactionItem
              title={tx.title}
              date={tx.date}
              amount={tx.amount}
              isIncome={tx.isIncome}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <MainScreen
      showHeader={true}
      title="İşlem Geçmişi"
      onLeftPress={() => navigation.navigate('Home')}
      onRightPress={() => console.log('Filtre')}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
      rightIcon={<Icon name="filter" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {renderSection('Bugün', todayTx)}
        {renderSection('Dün', yesterdayTx)}
        {renderSection('Son 30 Gün', recentTx)}
      </ScrollView>

      {/* Transaction Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={handleCloseModal}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Icon name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedTransaction && (
              <ScrollView style={styles.modalBody}>
                {/* Transaction Title and Amount */}
                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionTitle}>
                    {selectedTransaction.title}
                  </Text>
                  <Text style={[
                    styles.transactionAmount,
                    { color: selectedTransaction.isIncome ? '#28a745' : '#dc3545' }
                  ]}>
                    {selectedTransaction.isIncome ? '+' : '-'}
                    ₺{selectedTransaction.amount.toFixed(2)}
                  </Text>
                </View>

                {/* Transaction Details */}
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Icon name="calendar" size={16} color="#666" />
                    <Text style={styles.detailLabel}>Tarih:</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.date}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="tag" size={16} color="#666" />
                    <Text style={styles.detailLabel}>Kategori:</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.category || 'Belirtilmemiş'}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="credit-card" size={16} color="#666" />
                    <Text style={styles.detailLabel}>Ödeme Yöntemi:</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.paymentMethod || 'Belirtilmemiş'}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="file-text" size={16} color="#666" />
                    <Text style={styles.detailLabel}>Açıklama:</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.description || 'Açıklama yok'}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="hash" size={16} color="#666" />
                    <Text style={styles.detailLabel}>İşlem ID:</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.id}</Text>
                  </View>
                </View>

                {/* Generate Receipt Button */}
                <TouchableOpacity
                  style={styles.receiptButton}
                  onPress={handleGenerateReceipt}
                >
                  <Icon name="download" size={20} color="#fff" />
                  <Text style={styles.receiptButtonText}>Dekont Oluştur</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </MainScreen>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#5416ac',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    bottom:70,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.7,
    minHeight: screenHeight * 0.6,
  },
  modalHeader: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 12,
    padding: 4,
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },
  transactionHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  transactionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  transactionAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  receiptButton: {
    backgroundColor: '#5416ac',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
  },
  receiptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
