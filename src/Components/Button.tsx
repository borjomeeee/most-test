import React from 'react';
import * as RN from 'react-native';

interface IButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ text, onClick }) => {
  return (
    <RN.TouchableOpacity
      style={s.container}
      activeOpacity={0.7}
      onPress={onClick}
    >
      <RN.Text style={s.text}>{text}</RN.Text>
    </RN.TouchableOpacity>
  );
};

const s = RN.StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,

    backgroundColor: '#0000ff',

    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Button;
