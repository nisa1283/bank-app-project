import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const faqData = [
  {
    id: '1',
    question: 'Para transferi nasıl yapılır?',
    answer: 'Transfer menüsünden EFT, Havale veya FAST seçeneklerinden birini seçerek, alıcı bilgilerini girdikten sonra transfer işlemini gerçekleştirebilirsiniz.',
  },
  {
    id: '2',
    question: 'Fatura ödemesi nasıl yapılır?',
    answer: 'Fatura Öde menüsünden fatura kategorinizi seçin, fatura kodunuzu girin ve ödeme işlemini tamamlayın.',
  },
  {
    id: '3',
    question: 'Günlük transfer limitim nedir?',
    answer: 'Günlük transfer limitiniz 50.000 TL\'dir. Bu limit her gün gece yarısında yenilenir.',
  },
  {
    id: '4',
    question: 'FAST transfer nedir?',
    answer: 'FAST, 7 gün 24 saat anında para transferi yapmanızı sağlayan sistemdir. Transfer anında alıcının hesabına geçer.',
  },
  {
    id: '5',
    question: 'Şifremi unuttum, ne yapmalıyım?',
    answer: 'Giriş ekranında "Şifremi Unuttum" seçeneğine tıklayarak yeni şifre oluşturabilir veya müşteri hizmetlerimizi arayabilirsiniz.',
  },
  {
    id: '6',
    question: 'Hesabım bloke oldu, ne yapmalıyım?',
    answer: 'Hesap blokesi durumunda en kısa sürede müşteri hizmetlerimizle iletişime geçiniz: 444 0 123',
  },
];

const quickActions = [
  { id: '1', title: 'Canlı Destek', icon: 'message-circle', color: '#4285f4' },
  { id: '2', title: 'Video Rehber', icon: 'play-circle', color: '#ff6b35' },
  { id: '3', title: 'SSS', icon: 'help-circle', color: '#34a853' },
  { id: '4', title: 'İletişim', icon: 'phone', color: '#ea4335' },
];

const HelpScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case '1':
        // Canlı destek
        console.log('Canlı destek başlatılıyor...');
        break;
      case '2':
        // Video rehber
        console.log('Video rehber açılıyor...');
        break;
      case '3':
        // SSS
        console.log('SSS sayfası açılıyor...');
        break;
      case '4':
        // İletişim
        navigation.navigate('Contact');
        break;
    }
  };

  return (
    <MainScreen
      showHeader
      title="Yardım"
      onLeftPress={() => navigation.goBack()}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {/* Hızlı Yardım */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı Yardım</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionItem}
                onPress={() => handleQuickAction(action.id)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <Icon name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sık Sorulan Sorular */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sık Sorulan Sorular</Text>
          {faqData.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleFaq(faq.id)}
              >
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <Icon
                  name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* İletişim Bilgileri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İletişim</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Icon name="phone" size={20} color="#5416ac" />
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Müşteri Hizmetleri</Text>
                <Text style={styles.contactValue}>444 0 123</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Icon name="mail" size={20} color="#5416ac" />
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>E-posta</Text>
                <Text style={styles.contactValue}>destek@tapnPay.com.tr</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Icon name="clock" size={20} color="#5416ac" />
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Çalışma Saatleri</Text>
                <Text style={styles.contactValue}>7/24 Hizmet</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Yardım Talebi */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.helpRequestButton}>
            <Icon name="headphones" size={20} color="#fff" />
            <Text style={styles.helpRequestText}>Yardım Talebi Oluştur</Text>
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
    paddingBottom: 8,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactInfo: {
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactDetails: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 2,
  },
  helpRequestButton: {
    backgroundColor: '#5416ac',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  helpRequestText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HelpScreen;