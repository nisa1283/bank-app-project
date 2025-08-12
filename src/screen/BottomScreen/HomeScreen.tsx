import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity , Pressable, } from 'react-native';
import BalanceCard from '../../components/BalancedCard';
import CardItem from '../../components/CardItem';
import TransactionItem from '../../components/TransactionItem';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import IBANDisplay from '../../components/IBANDisplay';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';


const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const cards = [
    { id: '1', holder: 'Nisa Ünal', number: '**** **** **** 1234', expiry: '12/25' },
    { id: '2', holder: 'Nisa Ünal', number: '**** **** **** 5678', expiry: '11/27' },
  ];


  const transactions = [
    { id: 't4', title: 'Spotify', date: '24 Tem 2025', amount: 29.99, isIncome: false },
    { id: 't3', title: 'Bonus', date: '23 Tem 2025', amount: 300, isIncome: true },
    { id: 't2', title: 'Market', date: '22 Tem 2025', amount: 240.75, isIncome: false },
    { id: 't1', title: 'Maaş', date: '21 Tem 2025', amount: 5000, isIncome: true },

  ];
  const favoritePeople = [
    { id: 'p1', name: 'Ayşe', avatar: require("../../assets/ımages/user1.png") },
    { id: 'p2', name: 'Mehmet', avatar: require("../../assets/ımages/user1.png") },
    { id: 'p3', name: 'Zeynep', avatar: require("../../assets/ımages/user1.png") },
    { id: 'p4', name: 'Ali', avatar: require("../../assets/ımages/user1.png") },
    { id: 'p5', name: 'Beyza', avatar: require("../../assets/ımages/user1.png") },
    { id: 'p6', name: 'Ahmet', avatar: require("../../assets/ımages/user1.png") },
    { id: 'p7', name: 'Yusuf', avatar: require("../../assets/ımages/user1.png") },
    { id: 'p8', name: 'Ayça', avatar: require("../../assets/ımages/user1.png") },
  ];

  return (
    <MainScreen
      showHeader={true}
      title="Merhaba, Nisa 👋"
      titleStyle={{ fontSize: 28, color: '#5416ac', fontWeight: 'bold' ,marginRight:100,}}
      onRightPress={() => navigation.navigate("UserProfile")}
      rightIcon={<Icon name="user" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        
        <BalanceCard balance={2988.26} />
        <IBANDisplay />



        <Text style={styles.sectionTitle}>Kartlarım</Text>
        <FlatList
          horizontal
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardItem
              cardHolder={item.holder}
              cardNumber={item.number}
              expiry={item.expiry}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        />

        <Text style={styles.sectionTitle}>Sık Görüşülen Kişiler</Text>
        <FlatList
          horizontal
          data={favoritePeople}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <View style={styles.avatarWrapper}>
                <Image source={item.avatar} style={styles.avatar} />
              </View>
              <Text style={styles.contactName}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        />


        <Text style={styles.sectionTitle}>Son İşlemler</Text>
        {transactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            title={tx.title}
            date={tx.date}
            amount={tx.amount}
            isIncome={tx.isIncome}
          />
        ))}
      </ScrollView>
    </MainScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 0,
    marginBottom: 12,
  },
  headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginBottom: 12,
},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  contactItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  contactName: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
