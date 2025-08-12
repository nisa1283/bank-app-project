import React, { useState } from 'react';
import {View,Image,TextInput,StyleSheet,Text,TouchableOpacity,Modal,Pressable,} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import userData from '../data/user.json';

type PasswordScreenRouteProp = RouteProp<RootStackParamList, 'Password'>;

const PasswordScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PasswordScreenRouteProp>();
  const { phone: userPhone } = route.params;

  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('TR');
  const [callingCode, setCallingCode] = useState('90');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Yeni modal için state'ler
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2 as CountryCode);
    setCallingCode(country.callingCode[0]);
  };

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleLogin = () => {
    if (!password) {
      showAlert('Hata', 'Lütfen şifrenizi giriniz.');
      return;
    }

    if (password.length < 6) {
      showAlert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    const foundUser = userData.users.find(u => u.phone === userPhone);

    if (foundUser && foundUser.password === password) {
      navigation.replace('HomeTabs');
    } else {
      showAlert('Hata', 'Şifre yanlış. Lütfen tekrar deneyiniz.');
      setPassword('');
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      showAlert('Hata', 'Lütfen e-posta adresinizi giriniz.');
      return;
    }

    console.log('Şifre sıfırlama e-postası gönderildi:', email);
    showAlert('Başarılı', 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
    setModalVisible(false);
    setEmail('');
  };

  const handlePhoneForgotPassword = () => {
    if (!phone || phone.length < 9) {
      showAlert('Hata', 'Lütfen geçerli bir telefon numarası giriniz.');
      return;
    }

    const fullPhone = `+${callingCode}${phone}`;

    console.log('Şifre sıfırlama SMS gönderildi:', fullPhone);
    showAlert('Başarılı', 'Şifre sıfırlama kodu telefon numaranıza gönderildi.');
    setPhoneModalVisible(false);
    setPhone('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../assets/ımages/Yazı2.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/ımages/password.png')}
          style={styles.imageTel}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.baslıkcontainer}>
          <Text style={styles.Text}>Şifrenizi Giriniz</Text>
          <Text style={styles.phoneText}>Telefon: {userPhone}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.Text2}>Şifreniz</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Şifrenizi giriniz"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              maxLength={20}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Text style={styles.eyeText}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sifreunut}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#5416acff', fontWeight: 'bold' }}>Şifrenizi mi unuttunuz?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.giriscontainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>

        {/* E-posta Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Şifrenizi mi unuttunuz?</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelText}>İptal</Text>
                </Pressable>
              </View>

              <Text style={styles.eposta}>E-posta adresinizi giriniz:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="example@mail.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleForgotPassword}>
                <Text style={styles.modalButtonText}>Gönder</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setPhoneModalVisible(true);
                }}
              >
                <Text style={styles.switchText}>Telefon numarası ile sıfırla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Telefon Modal */}
        <Modal animationType="slide" transparent={true} visible={phoneModalVisible} onRequestClose={() => setPhoneModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Şifrenizi mi unuttunuz?</Text>
                <Pressable onPress={() => setPhoneModalVisible(false)}>
                  <Text style={styles.cancelText}>İptal</Text>
                </Pressable>
              </View>

              <Text style={styles.phoneLabel}>Telefon numaranızı girin:</Text>
              <View style={styles.phoneInputContainer}>
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji
                  onSelect={onSelect}
                  containerButtonStyle={styles.countryPicker}
                />
                <Text style={styles.callingCodeText}>+{callingCode}</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Telefon Numaranızı Giriniz"
                  keyboardType="phone-pad"
                  maxLength={15}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <TouchableOpacity style={styles.modalButton} onPress={handlePhoneForgotPassword}>
                <Text style={styles.modalButtonText}>Gönder</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setPhoneModalVisible(false);
                }}
              >
                <Text style={styles.switchText}>Email ile sıfırla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Yeni Alert Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={alertVisible}
          onRequestClose={() => setAlertVisible(false)}
        >
          <View style={styles.alertOverlay}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>{alertTitle}</Text>
              <Text style={styles.alertMessage}>{alertMessage}</Text>
              <TouchableOpacity style={styles.alertButton} onPress={() => setAlertVisible(false)}>
                <Text style={styles.alertButtonText}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    height: '80%',
  },
  imageTel: {
    width: '60%',
    height: '80%',
    bottom: 130,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  baslıkcontainer: {
    top: 20,
  },
  Text: {
    fontSize: 30,
    marginTop: -150,
    fontWeight: '500',
  },
  phoneText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  inputContainer: {
    bottom: 40,
  },
  Text2: {
    fontSize: 13,
    marginBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeButton: {
    padding: 12,
  },
  eyeText: {
    fontSize: 18,
  },
  sifreunut: {
    alignItems: 'flex-end',
    bottom: 30,
  },
  button: {
    backgroundColor: '#5416acff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    top: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  giriscontainer: {
    marginTop: 20,
    top: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  cancelText: {
    color: 'blue',
    fontSize: 16,
  },
  eposta: {
    fontSize: 16,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  phoneLabel: {
    fontSize: 16,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#5416acff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    color: '#5416acff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  countryPicker: {
    marginLeft: 10,
  },
  callingCodeText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: '#5416ac',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  alertButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
