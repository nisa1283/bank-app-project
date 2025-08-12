import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const features = [
  {
    id: '1',
    title: '7/24 Bankacılık',
    description: 'Kesintisiz hizmet',
    icon: 'clock',
    color: '#4285f4',
  },
  {
    id: '2',
    title: 'Güvenli İşlemler',
    description: '256-bit SSL şifreleme',
    icon: 'shield',
    color: '#34a853',
  },
  {
    id: '3',
    title: 'Anında Transfer',
    description: 'FAST ile hızlı transfer',
    icon: 'zap',
    color: '#ff6b35',
  },
  {
    id: '4',
    title: 'Kolay Kullanım',
    description: 'Sezgisel arayüz',
    icon: 'smartphone',
    color: '#9c27b0',
  },
];

const socialLinks = [
  { id: '1', name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
  { id: '2', name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
  { id: '3', name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
  { id: '4', name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/company' },
];

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <MainScreen
      showHeader
      title="Hakkında"
      onLeftPress={() => navigation.goBack()}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {/* Logo ve Başlık */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="credit-card" size={48} color="#5416ac" />
          </View>
          <Text style={styles.appName}>Tap'nPay </Text>
          <Text style={styles.appVersion}>Sürüm 2.4.1</Text>
          <Text style={styles.appDescription}>
            Güvenilir ve modern dijital bankacılık deneyimi
          </Text>
        </View>

        {/* Özellikler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Özellikler</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <View key={feature.id} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Icon name={feature.icon} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Hakkımızda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkımızda</Text>
          <Text style={styles.aboutText}>
            Tap'nPay, 1985 yılından bu yana müşterilerine güvenilir bankacılık hizmetleri sunmaktadır. 
            Dijital dönüşümde öncü olan bankamız, modern teknoloji altyapısı ile 7/24 kesintisiz 
            hizmet vermektedir.
          </Text>
          <Text style={styles.aboutText}>
            Müşteri memnuniyetini ön planda tutan anlayışımızla, bankacılık işlemlerinizi 
            güvenli ve kolay bir şekilde gerçekleştirmenizi sağlıyoruz.
          </Text>
        </View>

        {/* İstatistikler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rakamlarla Tap'nPay</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2.5M+</Text>
              <Text style={styles.statLabel}>Aktif Müşteri</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Şube</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2500+</Text>
              <Text style={styles.statLabel}>ATM</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>38</Text>
              <Text style={styles.statLabel}>Yıllık Deneyim</Text>
            </View>
          </View>
        </View>

        {/* Sosyal Medya */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sosyal Medya</Text>
          <View style={styles.socialLinksContainer}>
            {socialLinks.map((social) => (
              <TouchableOpacity
                key={social.id}
                style={styles.socialLink}
                onPress={() => openLink(social.url)}
              >
                <Icon name={social.icon} size={24} color="#5416ac" />
                <Text style={styles.socialLinkText}>{social.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Yasal Bilgiler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yasal Bilgiler</Text>
          <View style={styles.legalLinks}>
            <TouchableOpacity style={styles.legalLink}>
              <Text style={styles.legalLinkText}>Gizlilik Politikası</Text>
              <Icon name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalLink}>
              <Text style={styles.legalLinkText}>Kullanım Şartları</Text>
              <Icon name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalLink}>
              <Text style={styles.legalLinkText}>KVKK Aydınlatma Metni</Text>
              <Icon name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalLink}>
              <Text style={styles.legalLinkText}>Açık Rıza Metni</Text>
              <Icon name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Telif Hakkı */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Tap'nPay A.Ş. Tüm hakları saklıdır.
          </Text>
          <Text style={styles.footerSubText}>
            BDDK lisans kodu: 12345
          </Text>
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
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5416ac20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5416ac',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
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
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5416ac10',
    borderRadius: 12,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5416ac',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialLink: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  socialLinkText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  legalLinks: {
    gap: 8,
  },
  legalLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  legalLinkText: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    alignItems: 'center',
    padding: 24,
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
});

export default AboutScreen;