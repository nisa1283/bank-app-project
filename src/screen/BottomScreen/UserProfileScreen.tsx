import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MainScreen from '../../components/MainScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Feather';

const UserProfile: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <MainScreen
            showHeader
            title="Profilim"
            onLeftPress={() => navigation.navigate('HomeTabs')}
            leftIcon={<Icon name="arrow-left" size={24} color="#5416ac" />}
            titleStyle={{ fontSize: 24, color: '#000000ff', fontWeight: 'bold' ,}}
        >
            <View style={styles.container}>
                <Image
                    source={require('../../assets/ımages/user1.png')}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Nisa Ünal</Text>
                <Text style={styles.email}>1 Yıl önce katıldınız.</Text>

                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Üyelik Tipi:</Text>
                    <Text style={styles.infoValue}>Bireysel</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Hesap No:</Text>
                    <Text style={styles.infoValue}>1234 5678 9012</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Telefon No:</Text>
                    <Text style={styles.infoValue}>+90 512 345 67 89</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>nisa.unal@example.com</Text>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
        </MainScreen>
    );
};




export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 24,
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
    },
    infoLabel: {
        fontSize: 14,
        color: '#555',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        marginTop: 32,
        backgroundColor: '#d9534f',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    },
});
