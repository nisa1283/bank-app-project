import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Modal,
} from 'react-native';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const contactMethods = [
  { id: '1', title: 'Telefon', subtitle: '771 0 177', icon: 'phone', color: '#4285f4', action: 'call' },
  { id: '2', title: 'WhatsApp', subtitle: '+90 555 123 45 67', icon: 'message-circle', color: '#25d366', action: 'whatsapp' },
  { id: '3', title: 'E-posta', subtitle: 'destek@tapnPay.com.tr', icon: 'mail', color: '#ea4335', action: 'email' },
  { id: '4', title: 'Canlı Destek', subtitle: '7/24 Online', icon: 'headphones', color: '#ff6b35', action: 'chat' },
];

const branches = [
  { id: '1', name: 'Merkez Şube', address: 'Atatürk Cad. No: 123, Çankaya/Ankara', phone: '0312 123 45 67', hours: 'Pzt-Cum: 09:00-17:30' },
  { id: '2', name: 'Kızılay Şube', address: 'Kızılay Meydanı No: 45, Çankaya/Ankara', phone: '0312 987 65 43', hours: 'Pzt-Cum: 09:00-17:30' },
  { id: '3', name: 'Bahçelievler Şube', address: 'Akay Cad. No: 78, Bahçelievler/Ankara', phone: '0312 555 44 33', hours: 'Pzt-Cum: 09:00-17:30' },
];

const ContactScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [messageForm, setMessageForm] = useState({ name: '', email: '', subject: '', message: '' });

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalOnClose, setModalOnClose] = useState<() => void>(() => {});

  const openModal = (title: string, message: string, onClose?: () => void) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOnClose(() => onClose || (() => {}));
    setModalVisible(true);
  };

  const handleContactMethod = async (method: any) => {
    switch (method.action) {
      case 'call':
        Linking.openURL('tel:4440123');
        break;
      case 'whatsapp':
        Linking.openURL('whatsapp://send?phone=905551234567');
        break;
      case 'email':
        Linking.openURL('mailto:destek@mybank.com.tr');
        break;
      case 'chat':
        openModal('Canlı Destek', 'Canlı destek sistemine yönlendiriliyorsunuz...');
        break;
    }
  };

  const handleSendMessage = () => {
    if (!messageForm.name || !messageForm.email || !messageForm.subject || !messageForm.message) {
      openModal('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    openModal(
      'Mesaj Gönderildi',
      'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      () => navigation.goBack()
    );
  };

  const callBranch = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  return (
    <MainScreen
      showHeader
      title="İletişim"
      onLeftPress={() => navigation.goBack()}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {/* İletişim Yöntemleri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İletişim Yöntemleri</Text>
          <View style={styles.contactMethodsGrid}>
            {contactMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.contactMethodItem}
                onPress={() => handleContactMethod(method)}
              >
                <View style={[styles.methodIcon, { backgroundColor: method.color + '20' }]}>
                  <Icon name={method.icon} size={24} color={method.color} />
                </View>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mesaj Gönder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mesaj Gönder</Text>
          
          {['Ad Soyad', 'E-posta', 'Konu', 'Mesaj'].map((label, index) => {
            const keys = ['name', 'email', 'subject', 'message'] as const;
            const isMessage = label === 'Mesaj';
            return (
              <View style={styles.inputContainer} key={label}>
                <Text style={styles.inputLabel}>{label}</Text>
                <TextInput
                  style={[styles.textInput, isMessage && styles.textArea]}
                  placeholder={`${label} giriniz`}
                  value={messageForm[keys[index]]}
                  onChangeText={(text) => setMessageForm({ ...messageForm, [keys[index]]: text })}
                  keyboardType={label === 'E-posta' ? 'email-address' : 'default'}
                  multiline={isMessage}
                  numberOfLines={isMessage ? 5 : 1}
                />
              </View>
            );
          })}

          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Icon name="send" size={20} color="#fff" />
            <Text style={styles.sendButtonText}>Mesaj Gönder</Text>
          </TouchableOpacity>
        </View>

        {/* Şubeler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Şubelerimiz</Text>
          {branches.map((branch) => (
            <View key={branch.id} style={styles.branchItem}>
              <View style={styles.branchHeader}>
                <Text style={styles.branchName}>{branch.name}</Text>
                <TouchableOpacity style={styles.callButton} onPress={() => callBranch(branch.phone)}>
                  <Icon name="phone" size={16} color="#5416ac" />
                </TouchableOpacity>
              </View>
              <View style={styles.branchInfo}>
                <View style={styles.branchInfoRow}>
                  <Icon name="map-pin" size={14} color="#666" style={styles.branchIcon} />
                  <Text style={styles.branchText}>{branch.address}</Text>
                </View>
                <View style={styles.branchInfoRow}>
                  <Icon name="phone" size={14} color="#666" style={styles.branchIcon} />
                  <Text style={styles.branchText}>{branch.phone}</Text>
                </View>
                <View style={styles.branchInfoRow}>
                  <Icon name="clock" size={14} color="#666" style={styles.branchIcon} />
                  <Text style={styles.branchText}>{branch.hours}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Acil Durumlar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acil Durumlar</Text>
          <View style={styles.emergencyInfo}>
            <View style={styles.emergencyItem}>
              <Icon name="alert-triangle" size={20} color="#ff6b35" />
              <View style={styles.emergencyDetails}>
                <Text style={styles.emergencyTitle}>Kart Kayıp/Çalıntı</Text>
                <Text style={styles.emergencyText}>444 0 124 (7/24)</Text>
              </View>
            </View>
            <View style={styles.emergencyItem}>
              <Icon name="shield-off" size={20} color="#ea4335" />
              <View style={styles.emergencyDetails}>
                <Text style={styles.emergencyTitle}>Güvenlik</Text>
                <Text style={styles.emergencyText}>444 0 125 (7/24)</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                modalOnClose();
              }}
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
  contactMethodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactMethodItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  methodSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
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
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#5416ac',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  branchItem: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  branchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  branchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  callButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5416ac20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  branchInfo: {
    gap: 8,
  },
  branchInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  branchIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  branchText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  emergencyInfo: {
    gap: 16,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  emergencyDetails: {
    marginLeft: 12,
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  emergencyText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#5416ac',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ContactScreen;