import React, {useState} from 'react';
import {
  Button,
  Input,
  InputProps,
  Layout,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components';
import {styles} from '../../theme/theme'; // revisa la ruta de theme
import {FlatList, Image, ScrollView} from 'react-native';
import {CustomIcon} from '../../components/CustomIcon';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = useState(initialValue);
  return {value, onChangeText: setValue};
};

export const ReleaseScreen = () => {
  const multilineInputState = useInputState();
  const [claveCatastral, setClaveCatastral] = useState('');
  const [propietario, setPropietario] = useState('');
  const [dni, setDni] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [otherValue, setOtherValue] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [observaciones, setObservaciones] = useState('');
  const [images, setImages] = useState<null | {uri: string}[]>([]);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        const selectedImages = response.assets.map(asset => ({
          uri: asset.uri ?? '',
        }));
        setImages([...(images ?? []), ...selectedImages]);
        console.log('Images selected:', selectedImages);
      }
    });
  };

  const handleSubmit = async () => {
    // Se crea un objeto con los datos que se van a enviar en la solicitud POST.
    const reportData = {
      claveCatastral,
      propietario,
      dni,
      celular,
      direccion,
      tipoReporte: showOtherInput ? otherValue : selectedIndex + 1,
      observaciones,
      images,
    };

    console.log('Report data to be sent:', reportData);

    try {
      // Se realiza la solicitud POST a la API usando axios.
      console.log('Sending POST request to API...');
      const response = await axios.post('http://192.168.158.114:7055/api/report', reportData);
      
      // Si la solicitud es exitosa, se imprime en la consola el dato recibido en la respuesta.
      console.log('Reporte enviado exitosamente:', response.data);
    } catch (error) {
      // Si ocurre algún error durante la solicitud, se captura y se imprime en la consola.
      console.error('Error al enviar el reporte:', error.message);
    }
  };

  return (
    <Layout style={styles.background}>
      <ScrollView>
        <Text category="h2" style={styles.title}>
          Detalle del Reporte
        </Text>
        <Layout style={styles.container}>
          <Layout style={{marginBottom: 15}}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>
              Ingrese clave Catastral:
            </Text>
            <Input
              style={styles.input}
              value={claveCatastral}
              onChangeText={setClaveCatastral}
            />
          </Layout>
          <Layout style={{marginBottom: 15}}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>
              Propietario:
            </Text>
            <Input
              style={styles.input}
              value={propietario}
              onChangeText={setPropietario}
            />
          </Layout>
          <Layout style={{marginBottom: 15}}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>DNI:</Text>
            <Input style={styles.input} value={dni} onChangeText={setDni} />
          </Layout>
          <Layout style={{marginBottom: 15}}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>
              No. Celular:
            </Text>
            <Input
              style={styles.input}
              keyboardType="numeric"
              value={celular}
              onChangeText={setCelular}
            />
          </Layout>
          <Layout style={{marginBottom: 15}}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>
              Dirección Exacta:
            </Text>
            <Layout style={{padding: 10}}>
              <Input
                multiline={true}
                textStyle={styles.multiline}
                value={direccion}
                onChangeText={setDireccion}
              />
            </Layout>
          </Layout>
          <Layout style={{marginBottom: 15}}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>
              {`Tipo de Reporte o Incidencia: ${selectedIndex + 1}`}
            </Text>
            <RadioGroup
              style={styles.radiogroup}
              selectedIndex={selectedIndex}
              onChange={index => {
                setSelectedIndex(index);
                if (index === 6) {
                  setShowOtherInput(true);
                } else {
                  setShowOtherInput(false);
                }
              }}>
              <Radio style={{flexBasis: '33%'}}>Instalación</Radio>
              <Radio style={{flexBasis: '33%'}}>Reparación</Radio>
              <Radio style={{flexBasis: '33%'}}>Reinstalación</Radio>
              <Radio style={{flexBasis: '33%'}}>Corte</Radio>
              <Radio style={{flexBasis: '33%'}}>Mantenimiento Preventivo</Radio>
              <Radio style={{flexBasis: '33%'}}>Revisión</Radio>
              <Radio style={{flexBasis: '33%'}}>Otro</Radio>
            </RadioGroup>
            {showOtherInput && (
              <Input
                style={{margin: 10}}
                placeholder="Ingrese otro valor"
                value={otherValue}
                onChangeText={setOtherValue}
              />
            )}
          </Layout>
          <Layout style={{marginBottom: 15}}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>
              Observaciones/Conclusiones/Recomendaciones:
            </Text>
            <Layout style={{padding: 10}}>
              <Input
                multiline={true}
                textStyle={styles.multiline}
                value={observaciones}
                onChangeText={setObservaciones}
              />
            </Layout>
          </Layout>
          <Button
            style={styles.buttonPhoto}
            accessoryLeft={<CustomIcon name="cloud-upload-outline" />}
            onPress={selectImage}>
            Subir foto
          </Button>
        </Layout>
      </ScrollView>
      <Layout>
        {images && (
          <FlatList
            data={images}
            renderItem={({item}) => (
              <Image
                source={{uri: item.uri}}
                style={{width: 100, height: 100}}
              />
            )}
            keyExtractor={item => item.uri}
            horizontal={true}
          />
        )}
      </Layout>
      <Layout style={styles.buttonPhoto}>
        <Button onPress={handleSubmit}>Enviar</Button>
      </Layout>
    </Layout>
  );
};


