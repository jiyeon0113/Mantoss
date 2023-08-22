import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput,
} from 'react-native';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = email => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    const isLoginEnabled = () => {
        return email.length > 0 && password.length > 0 && isEmailValid(email);
    };

    const hanndleTermsScreen = () => {
        navigation.navigate('TermsScreen');
    };

    // ... (이전 코드)

    const handleMainScreen = () => {
        if (!isLoginEnabled()) {
            if (email.length === 0 || password.length === 0) {
                Alert.alert('로그인 실패', '아이디와 비밀번호를 모두 입력해주세요.', [{ text: '확인' }]);
            } else if (!isEmailValid(email)) {
                Alert.alert('로그인 실패', '올바른 이메일 형식이 아닙니다. 다시 확인해주세요.', [{ text: '확인' }]);
            }
        } else {
            // Simulate a successful login
            Alert.alert('로그인 성공', '로그인에 성공했습니다.', [{ text: '확인' }]);
            navigation.navigate('Home');
        }
    };

// ... (나머지 코드)


    const handlePW_findScreen = () => {
        navigation.navigate('Pw_find');
    };

    const data = [
        { key: 'SignUp', title: '회원 가입', onPress: hanndleTermsScreen },
        { key: 'PwFind', title: '비밀번호 찾기', onPress: handlePW_findScreen },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={item.onPress}
        >
            <Text style={styles.textButton}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/main.png')} style={[styles.image, { opacity: 0.5 }]} resizeMode="contain"/>
            <TextInput
                title={'이메일'}
                style={styles.input}
                placeholder="your@mail.com"
                keyboardType={KeyboardTypes.EMAIL}
                returnKeyType={ReturnKeyTypes.NEXT}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                title={'비밀번호'}
                style={styles.input}
                placeholder="pw"
                returnKeyType={ReturnKeyTypes.DONE}
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <LinearGradient
            colors={['#81AAFB', '#C1AEEF']} // 그라디언트 색상 배열
            style={styles.gradientText}>
                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={handleMainScreen}
                >
                    <Text style={styles.mainButtonText}>Login</Text>
                </TouchableOpacity>
            </LinearGradient>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                contentContainerStyle={styles.buttonContainer}
            />
            <Text style={styles.text}>vol.0.1</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    baseText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: 'white',
    },
    mainButton: {
        fontSize: 20,
        borderRadius: 10,
        paddingHorizontal: 100,
        paddingVertical: 5,
        margin: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButtonText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    textButton: {
        fontSize: 20,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 1,
        marginLeft: 20,
        marginBottom: 180,
    },
    button: {
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        color: '#2D5E40',
    },
    image: {
        margin: 20,
        height: 200,
        margin: 50,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        color: '#2D5E40',
    },
    input: {
        borderWidth: 1,
        borderColor: '#6717CD',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#538454',
    },
    gradientText: {
        borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Login;
