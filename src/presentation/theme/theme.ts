import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f9fc',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#222b45',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    color: '#8f9bb3',
  },
  input: {
    marginTop: 8,
    borderColor: '#e4e9f2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  radiogroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonPhoto: {
    marginTop: 20,
    backgroundColor: '#3366ff',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'center',
  },
});
