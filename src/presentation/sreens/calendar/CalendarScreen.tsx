import { API_URL } from '@env';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RegistrationWaterList } from '../../components/calendar/RegistrationWaterList';
import { CusCalendar } from '../../components/calendar/CusCalendar';

interface NeighborhoodsColonies {
  id: string;
  name: string;
  blockId: string;
  blockName?: string;
}

interface RegistrationWater {
  id: string;
  date: string;
  observations: string;
  neighborhoodColonies: NeighborhoodsColonies[];
}

export const CalendarScreen = () => {
  const [registerWater, setRegisterWater] = React.useState<RegistrationWater[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRegistrationWater, setSelectedRegistrationWater] = useState<RegistrationWater | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  //poner fecha actual desde el inicio
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(today);
  

  const handleItemPress = (registrationWater: RegistrationWater) => {
    setSelectedRegistrationWater(registrationWater);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRegistrationWater(null);
  };

  //traer el nombre del bloque
  const fetchBlockName = async (blockId: string): Promise<string> => {
    try {
      const response = await axios.get(`${API_URL}/block/${blockId}`);
      //const response = await axios.get(`http://192.168.1.15:5088/api/block/${blockId}`);
      //console.log('response.data.data BLOCK: ', response.data.data);
      return response.data.data?.name || 'Desconocido';
    } catch (error) {
      console.error(`Error al traer el nombre del bloque: ${blockId}`, error);
      return 'Desconocido';
    }
  };

  //traer los datos de la api
    const fetchRegisterWater = async () => {
      try {
        //console.log('API_URL essss: ', API_URL);
        const response = await axios.get(`${API_URL}/registration`);
        //const response = await axios.get('http://192.168.1.15:5088/api/registration');
        console.log('response.data.data ESSSS: ', response.data.data);

        //esto es para traer el nombre del bloque
        const registrations: RegistrationWater[] = response.data.data;

        const updatedRegistrations = await Promise.all(
          registrations.map(async (registration) => {
            const updatedNeighborhoods = await Promise.all(
              registration.neighborhoodColonies.map(async (colony) => {
                const blockName = await fetchBlockName(colony.blockId);

                console.log('blockName ESSSS: ', blockName);
                return { ...colony, blockName };
              })
            );
            return { ...registration, neighborhoodColonies: updatedNeighborhoods };
          })
        );
        setRegisterWater(updatedRegistrations);
        setLoading(false);

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error: ', {
            message: error.message,
            code: error.code,
            config: error.config,
            response: error.response
          });

        } else {
          console.error('Otro error: ', error);
        }
      }
    };

    //actualizar los datos en tiempo real
    useEffect(() => {
      fetchRegisterWater();
      const intervalId = setInterval(() => {
        fetchRegisterWater();
      }, 240000); //cada minuto
      return () => clearInterval(intervalId);
    }, []);

    // Agrupar datos por bloque
  const groupByBlock = (data: RegistrationWater[]) => {
    const grouped: { [key: string]: RegistrationWater[] } = {};
    data.forEach((item) => {
      item.neighborhoodColonies.forEach((colony) => {
        const blockName = colony.blockName || 'Desconocido';
        if (!grouped[blockName]) {
          grouped[blockName] = [];
        }
        if (!grouped[blockName].find((r) => r.id === item.id)) {
          grouped[blockName].push(item);
        }
      });
    });
    return grouped;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  // Filter data by selected date
  const filteredData = selectedDate
  ? registerWater.filter(item => new Date(item.date).toISOString().split('T')[0] === selectedDate)
  : registerWater;
  const groupedData = groupByBlock(filteredData);

  return <>

<View style={styles.container}>
      <CusCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      {Object.keys(groupedData).length > 0 ? (
        <FlatList
          data={Object.keys(groupedData)}
          keyExtractor={(item) => item}
          renderItem={({ item: blockName }) => (
            <View style={styles.blockContainer}>
              <Text style={styles.blockText}>Bloque: {blockName}</Text>
              {groupedData[blockName].map((registrationWater) => (
                <RegistrationWaterList
                  key={registrationWater.id}
                  registrationWater={registrationWater}
                  press={handleItemPress}
                />
              ))}
            </View>
          )}
        />
      ) : (
        <Text style={styles.detailText}>No hay datos para la fecha seleccionada</Text>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRegistrationWater ? (
              <>
                <Text style={styles.detailTitle}>Detalles del Registro:</Text>
                <Text style={styles.detailText}>Fecha: {new Date(selectedRegistrationWater.date).toLocaleDateString('es-ES')}</Text>
                <ScrollView style={styles.scrollView}>
                  {selectedRegistrationWater.neighborhoodColonies.map((neighborhood) => (
                    <View key={neighborhood.id} style={styles.neighborhoodContainer}>
                      <Text style={styles.neighborhoodName}>{neighborhood.name}</Text>
                      <Text style={styles.neighborhoodBlock}>Bloque: {neighborhood.blockName || 'Desconocido'}</Text>
                    </View>
                  ))}
                  <Text style={styles.observationsText}>Observaciones: {selectedRegistrationWater.observations}</Text>
                </ScrollView>
                <Pressable style={styles.closeButton} onPress={handleCloseModal}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              </>
            ) : (
              <Text style={styles.noDataText}>No hay datos disponibles</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  </>
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#696969',
  },
  detailText: {
    fontSize: 16,
    color: 'gray',
  },
  scrollView: {
    marginVertical: 10,
  },
  neighborhoodContainer: {
    marginBottom: 10,
  },
  neighborhoodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#626161',
  },
  neighborhoodBlock: {
    fontSize: 14,
    color: 'gray',
  },
  observationsText: {
    fontSize: 14,
    marginTop: 10,
    color: 'gray',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#27AAE1',
    borderRadius: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  blockContainer: {
    marginBottom: 12,
  },
  blockText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
});