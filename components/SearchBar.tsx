import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps extends TextInputProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, ...props }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={30} color="#ccc" />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        onChangeText={onSearch}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 20,
  },
});

export default SearchBar;

