import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MainScreen from '../../components/MainScreen';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const actions = [
  { id: '1', title: 'Fatura Öde', icon: 'file-text', screen: 'Bill' },
  { id: '2', title: 'Transfer', icon: 'repeat', screen: 'Transfer' },
  { id: '3', title: 'Bakiye Yükle', icon: 'plus-circle', screen: null },
  { id: '4', title: 'Para Çek', icon: 'arrow-down-circle', screen: null },
  { id: '5', title: 'Analizler', icon: 'bar-chart-2', screen: null },
  { id: '6', title: 'Yardım', icon: 'help-circle', screen: 'Help' },
  { id: '7', title: 'İletişim', icon: 'phone', screen: 'Contact' },
  { id: '8', title: 'Hakkında', icon: 'info', screen: 'About' },
];

const MoreScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleActionPress = (item: any) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else {
      console.log(item.title);
      // Diğer ekranlar için burada navigation ekleyebilirsiniz
    }
  };

  return (
    <MainScreen
      showHeader
      title="Daha Fazla"
      onLeftPress={() => navigation.navigate('Home')}
      leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
    >
      <ScrollView style={styles.container}>
        {actions.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.item} 
            onPress={() => handleActionPress(item)}
          >
            <View style={styles.iconBox}>
              <Icon name={item.icon} size={20} color="#5416ac" />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Icon name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </MainScreen>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f2eafa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});