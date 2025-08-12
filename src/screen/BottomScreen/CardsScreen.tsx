import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MainScreen from '../../components/MainScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const dummyCards = [
  {
    id: '1',
    bank: 'Ziraat Bankası',
    number: '**** **** **** 1234',
    holder: 'Nisa Ünal',
    expiry: '12/26',
    type: 'visa',
  },
  {
    id: '2',
    bank: 'İş Bankası',
    number: '**** **** **** 5678',
    holder: 'Nisa Ünal',
    expiry: '10/25',
    type: 'mastercard',
  },
  {
    id:'3',
    bank:'Yapı Kredi',
    number:'**** **** **** 9101',
    halder:'Nisa Ünal',
    expiry:'12/28',
    type:'mastercard',
  },
];

const CardsScreen: React.FC = () => {
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
     <MainScreen
      showHeader={true}
      title="Kartlarım"
      onLeftPress={() => navigation.navigate('Home')}
      onRightPress={() => console.log('artı')}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
      rightIcon={<Icon name="plus" size={24} color="#5416ac" />}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {dummyCards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <Text style={styles.bankText}>{card.bank}</Text>
            <Text style={styles.number}>{card.number}</Text>
            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.label}>Kart Sahibi</Text>
                <Text style={styles.value}>{card.holder}</Text>
              </View>
              <View>
                <Text style={styles.label}>Son Kullanma</Text>
                <Text style={styles.value}>{card.expiry}</Text>
              </View>
              <Image
                source={
                  card.type === 'visa'
                    ? require('../../assets/ımages/VisaCard.png')
                    : require('../../assets/ımages/Mastercard.png')
                }
                style={styles.logo}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus-circle" size={28} color="#4584c6ff" />
          <Text style={styles.addText}>Yeni Kart Ekle</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainScreen>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 60,
  },
  cardContainer: {
    backgroundColor: '#5416ac',
    borderRadius: 12,
    padding: 60,
    marginBottom: 30,
    elevation: 4,
  },
  bankText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  number: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#aaa',
    fontSize: 12,
  },
  value: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  logo: {
    width: 40,
    height: 24,
    resizeMode: 'contain',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center',
  },
  addText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 8,
  },
});
