import { Text, View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, GRAY, PRIMARY } from '../colors';
import { forwardRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const KeyboardType = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

export const IconNames = {
  EMAIL: 'email',
  PASSWORD: 'lock',
};

const Input = forwardRef(
  (
    {
      title,
      placeholder,
      value,
      iconName,

      //   keyboardType,
      //   returnKeyType,
      //   secureTextEntry,
      ...props
    },
    ref
  ) => {
    const [isFocussed, setIsFocussed] = useState(false);
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title, // default
            value && styles.hasValueTitle, // value
            isFocussed && styles.focusedTitle, // value + focus
          ]}
        >
          {title}
        </Text>

        <View>
          <TextInput
            ref={ref}
            {...props}
            value={value}
            style={[
              styles.input,
              value && styles.hasValueInput,
              isFocussed && styles.focusedInput,
            ]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            autoCapitalize={'none'}
            autoCorrect={false}
            textContentType={'none'}
            keyboardAppearance={'light'}
            onBlur={() => setIsFocussed(false)}
            onFocus={() => setIsFocussed(true)}
          />

          <View style={styles.icon}>
            <MaterialIcons
              name={iconName}
              size={20}
              color={(() => {
                switch (
                  true //true값과 isFocussed값이면 무엇을해라.
                ) {
                  case isFocussed:
                    return PRIMARY.DEFAULT;
                  case !value:
                    return BLACK;
                  default:
                    return GRAY.DEFAULT;
                }
              })()}
            />
          </View>
        </View>
      </View>
    );
  }
);

Input.displayName = 'Input';
Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

Input.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf(Object.values(KeyboardType)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
    color: GRAY.DEFAULT,
  },
  focusedTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },
  hasValueTitle: {
    color: BLACK,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: GRAY.DEFAULT,
    paddingHorizontal: 20,
    height: 42,
    paddingLeft: 30,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;
