import React, { useState } from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput,Alert,} from 'react-native';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const transferTurleri = [
  { id: '1', name: 'EFT', icon: 'send', color: '#4285f4', description: 'Elektronik Fon Transferi' },
  { id: '2', name: 'Havale', icon: 'repeat', color: '#34a853', description: 'Aynı banka içi transfer' },
  { id: '3', name: 'FAST', icon: 'zap', color: '#ff6b35', description: '7/24 anında transfer' },
];

const sonKullanicilar = [
  {id:  '4', name:'Yusuf Kirman ', iban: 'TR11 0001 0024 8997 0820 3250 01', initial:'YK'},
  { id: '1', name: 'Ahmet Yılmaz', iban: 'TR32 0006 1005 1978 6457 8413 26', initial: 'AY' },
  { id: '2', name: 'Fatma Kaya', iban: 'TR56 0004 6004 6888 8000 1330 99', initial: 'FK' },
  { id: '3', name: 'Mehmet Demir', iban: 'TR12 0001 0017 4555 5555 5555 01', initial: 'MD' },
];

const TransferScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTransferType, setSelectedTransferType] = useState<string | null>(null);
  const [aliciAdi, setAliciAdi] = useState('');
  const [iban, setIban] = useState('');
  const [tutar, setTutar] = useState('');
  const [aciklama, setAciklama] = useState('');

  const handleTransferTypeSelect = (typeId: string) => {
    setSelectedTransferType(typeId);
  };

  const handleQuickSelect = (user: any) => {
    setAliciAdi(user.name);
    setIban(user.iban);
  };

  const formatIban = (text: string) => {
    // IBAN'ı formatla (her 4 karakterde bir boşluk)
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.toUpperCase();
  };

  const handleIbanChange = (text: string) => {
    const formatted = formatIban(text);
    setIban(formatted);
  };

  const handleTransfer = () => {
    if (!selectedTransferType || !aliciAdi || !iban || !tutar) {
      Alert.alert('Uyarı', 'Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    const selectedType = transferTurleri.find(type => type.id === selectedTransferType);
    
    Alert.alert(
      'Transfer Onayı',
      `Transfer Türü: ${selectedType?.name}\nAlıcı: ${aliciAdi}\nIBAN: ${iban}\nTutar: ${tutar} TL\nAçıklama: ${aciklama || 'Belirtilmemiş'}\n\nTransferi onaylıyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Onayla',
          onPress: () => {
            Alert.alert('Başarılı', 'Transfer işlemi tamamlandı!', [
              { text: 'Tamam', onPress: () => navigation.goBack() }
            ]);
          }
        }
      ]
    );
  };

  return (
    <MainScreen
      showHeader
      title="Para Transferi"
      onLeftPress={() => navigation.goBack()}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {/* Transfer Türü Seçimi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transfer Türü</Text>
          <View style={styles.transferTypes}>
            {transferTurleri.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.transferTypeItem,
                  selectedTransferType === type.id && styles.selectedTransferType
                ]}
                onPress={() => handleTransferTypeSelect(type.id)}
              >
                <View style={[styles.transferIcon, { backgroundColor: type.color + '20' }]}>
                  <Icon name={type.icon} size={20} color={type.color} />
                </View>
                <View style={styles.transferInfo}>
                  <Text style={styles.transferName}>{type.name}</Text>
                  <Text style={styles.transferDescription}>{type.description}</Text>
                </View>
                {selectedTransferType === type.id && (
                  <Icon name="check-circle" size={20} color="#5416ac" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hızlı Seçim */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Transferler</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickSelectContainer}>
              {sonKullanicilar.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.quickSelectItem}
                  onPress={() => handleQuickSelect(user)}
                >
                  <View style={styles.userAvatar}>
                    <Text style={styles.userInitial}>{user.initial}</Text>
                  </View>
                  <Text style={styles.userName}>{user.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Transfer Bilgileri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transfer Bilgileri</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Alıcı Adı Soyadı *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Alıcının tam adını giriniz"
              value={aliciAdi}
              onChangeText={setAliciAdi}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>IBAN *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="TR00 0000 0000 0000 0000 0000 00"
              value={iban}
              onChangeText={handleIbanChange}
              maxLength={34}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tutar (TL) *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0.00"
              value={tutar}
              onChangeText={setTutar}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Açıklama</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Transfer açıklaması (isteğe bağlı)"
              value={aciklama}
              onChangeText={setAciklama}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Bakiye ve Limitler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
          <View style={styles.accountInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kullanılabilir Bakiye:</Text>
              <Text style={styles.infoValue}>12,350.75 TL</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Günlük Transfer Limiti:</Text>
              <Text style={styles.infoValue}>50,000.00 TL</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kalan Limit:</Text>
              <Text style={styles.infoValue}>47,245.50 TL</Text>
            </View>
          </View>
        </View>

        {/* Transfer Butonu */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[
              styles.transferButton,
              (!selectedTransferType || !aliciAdi || !iban || !tutar) && styles.disabledButton
            ]}
            onPress={handleTransfer}
            disabled={!selectedTransferType || !aliciAdi || !iban || !tutar}
          >
            <Icon name="send" size={20} color="#fff" />
            <Text style={styles.transferButtonText}>Transferi Gerçekleştir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MainScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  transferTypes: {
    gap: 12,
  },
  transferTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f8f9fa',
  },
  selectedTransferType: {
    borderColor: '#5416ac',
    backgroundColor: '#5416ac10',
  },
  transferIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transferInfo: {
    flex: 1,
  },
  transferName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transferDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  quickSelectContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 16,
  },
  quickSelectItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5416ac',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  userInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  accountInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  transferButton: {
    backgroundColor: '#5416ac',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  transferButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TransferScreen;