import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';

const CreatAccountScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('TR');
  const [callingCode, setCallingCode] = useState('90');
  const [accepted, setAccepted] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleAccepted = () => {
    setAccepted(!accepted);
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2 as CountryCode);
    setCallingCode(country.callingCode[0]);
  };
  const handleCreateAccount = () => {
    if (!accepted) return;
    setModalVisible(true);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.ımage}>
        <Image
          source={require('../assets/ımages/Yazı2.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.CreatContainer}>
        <View style={styles.baslık}>
          <Text style={styles.Text}>Hesap Oluşturun</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.Text2}>İsim Soyisim </Text>

          <TextInput
            style={styles.input}
            placeholder="İsminizi Giriniz"
            keyboardType="default"
            maxLength={35}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.Text2}>Telefon Numaranız </Text>
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.Text2}>Şifre </Text>

          <TextInput
            style={styles.input3}
            placeholder="Şifrenizi Giriniz"
            keyboardType="visible-password"
            secureTextEntry={true}
            maxLength={35}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.Text2}>Şifre Yeniden </Text>

          <TextInput
            style={styles.input3}
            placeholder="Şifrenizi Yeniden Giriniz"
            keyboardType="visible-password"
            secureTextEntry={true}
            maxLength={35}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.checkboxContainer} onPress={toggleAccepted}>
        <Icon
          name={accepted ? 'check-square-o' : 'square-o'}
          size={24}
          color={accepted ? '#5416ac' : '#999'}
          style={styles.checkbox}
        />
        <Text style={styles.label}>
          I accept{' '}
          <Text style={styles.link}>Terms and Conditions</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { opacity: accepted ? 1 : 0.5 }]}
        onPress={handleCreateAccount}
        disabled={!accepted}
      >
        <Text style={styles.buttonText}>Hesap Oluştur</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Başarılı</Text>
            <Text style={styles.modalMessage}>Hesap oluşturuldu!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    </View>
  );
};

export default CreatAccountScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ımage: {
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: '30%',
    height: '10%',
    bottom: -50,
  },
  CreatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  baslık: {
    top: 130,
  },
  Text: {
    fontSize: 30,
    marginTop: -150,
    fontWeight: '600',
  },
  inputContainer: {
    top: 10,
    marginTop: 20,

  },
  Text2: {
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  countryPicker: {


  },
  callingCodeText: {
    fontSize: 16,
    marginRight: -10,
  },
  phoneInput: {
    flex: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  input3: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 20,
    top: 25,
  },
  checkbox: {
    margin: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  link: {
    color: '#5416ac',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#5416acff', // Mor tonunda
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    top: -20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: 'gray',
  },
  SocialMediaContainer: {
    alignItems: 'center',
    marginTop: 10,
    top: -40,
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
    backgroundColor: 'rgba(0,0,0,0.5)', // yarı şeffaf arka plan
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
    fontSize: 20,
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
    color: 'white',
    fontWeight: 'bold',
  },
});
