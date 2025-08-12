import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import userData from '../data/user.json';



const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('TR');
  const [callingCode, setCallingCode] = useState('90');
  const [country, setCountry] = useState<Country | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);// Örn: 'TR'
    setCallingCode(country.callingCode[0]);// Örn: '90'
    setCountry(country);
  };
 const showError = (message: string) => {
    setErrorMessage(message);
    setModalVisible(true);
  };
  const handleLogin = () => {
    if (!phone || phone.length < 9) {
      showError('Lütfen geçerli bir telefon numarası giriniz.');
      return;
    }

  const fullPhone = `+${callingCode}${phone}`;
  const foundUser = userData.users.find(u => u.phone === fullPhone);

  if (foundUser) {
    navigation.navigate('Password', { phone: fullPhone });
  } else {
    showError('Kullanıcı bulunamadı.');
  }
};

  return (
    <View style={styles.container}>
      {/* Üst Kısım - Resimler */}
      <View style={styles.top}>
        <Image
          source={require('../assets/ımages/Yazı2.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/ımages/Telefon.png')}
          style={styles.imageTel}
          resizeMode="contain"
        />
      </View>

      {/* Alt Kısım - Giriş */}
      <View style={styles.bottom}>
        <View style={styles.baslıkcontainer}>
          <Text style={styles.Text}>Telefon Numaranızı Giriniz</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.Text2}>Telefon Numaranız</Text>
          <View style={styles.phoneInputRow}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCallingCode
              withEmoji
              withAlphaFilter
              onSelect={onSelect}
              containerButtonStyle={styles.countryPicker}
            />
            <Text style={styles.callingCode}>+{callingCode}</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefon Numaranızı Tuşlayın"
              keyboardType="phone-pad"
              maxLength={15}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View style={styles.giriscontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Devam</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or continue using</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.SocialMediaContainer}>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconBox}>
              <Icon name="facebook" size={28} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <Icon name="google" size={28} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <Icon name="apple" size={28} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#1f569aff', bottom: 100, fontSize: 16 }}>
            Hesabınız yok mu? Kayıt olun.
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Hata</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#F7F4FF',
  },
  image: {
    width: '40%',
    height: '80%'
  },
  imageTel: {
    width: '60%',
    height: '80%',
    bottom: 130
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  baslıkcontainer: {
    top: 100
  },
  Text: {
    fontSize: 30,
    marginTop: -140,
    fontWeight: '400'
  },
  inputContainer: {
    top: 40
  },
  Text2: {
    fontSize: 13
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 8,
    height: 50
  },
  countryPicker: {
    marginRight: 5,
    height: 35,
  },
  callingCode: {
    fontSize: 16,
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 16
  },
  giriscontainer: {
    marginTop: 20,
    top: 30
  },
  button: {
    backgroundColor: '#5416acff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    top: 80,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc'
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: 'gray'
  },
  SocialMediaContainer: {
    alignItems: 'center',
    marginTop: 10,
    top: 60
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // koyu transparan arka plan
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#5416acff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
     },
});

