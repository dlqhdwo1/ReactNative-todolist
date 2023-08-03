import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Keyboard } from 'react-native';
import Button from '../components/Button';
import Input, {
  IconNames,
  KeyboardType,
  ReturnKeyTypes,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = () => {
    if (!disabled) {
      Keyboard.dismiss(); // 키보드가 사라지는 함수임.
      console.log('onSubmit');
    }
  };

  console.log(passwordRef); // {"current" : null}
  console.log(passwordRef.current); // null

  passwordRef.current = '123'; //   useRef로 만든 값은 리렌더링되어도 값이 변경되지 않는다.

  return (
    <SafeInputView>
      <View style={styels.container}>
        <Image
          source={require('../../assets/결혼사진.jpg')}
          style={styels.image}
          resizeMode={'cover'}
        />

        <Input
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          title={'email'}
          placeholder={'your@email.com'}
          keyboardType={KeyboardType.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          title={'password'}
          secureTextEntry
          iconName={IconNames.PASSWORD}
          onSubmitEditing={onSubmit}
        />

        <View style={styels.buttonContainer}>
          <Button title={'LOGIN'} onPress={onSubmit} disabled={disabled} />
        </View>
      </View>
    </SafeInputView>
  );
};

const styels = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },

  buttonContainer: {
    width: 350,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default SignInScreen;
