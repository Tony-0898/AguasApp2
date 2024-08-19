import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios'; // Importa Axios

export const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const api = axios.create({
        baseURL: 'http://192.168.58.114:7050/api', // verifica siempre las conexiones de IP
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from API...");
                const response = await api.get('/communicate'); // Llamando a la API
                console.log("Data fetched successfully:", response.data);

                if (response.data.status) {
                    setData(response.data.data);
                    setError(null);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
                Alert.alert("Error", "No se pudo obtener los datos de la API.");
            }
        };

        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image 
                        source={{ uri: 'http://placehold.it/400x400' }} // Espacio para la imagen
                        style={styles.image}
                    />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>Unidad Desconcentrada</Text>
                        <Text style={styles.headerText}>Empresa Municipal</Text>
                        <Text style={styles.headerText}>Aguas de Santa Rosa</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    {error ? (
                        <Text style={styles.errorText}>Error: {error.message}</Text>
                    ) : (
                        data.length > 0 ? (
                            data.map((item) => (
                                <View key={item.id} style={styles.cardContent}>
                                    <Text style={styles.title}>{item.tittle}</Text> {/* Titulo en rojo */}
                                    <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text> {/* Fecha en azul claro */}
                                    <Text style={styles.content}>{item.content}</Text> {/* Contenido en negro */}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noData}>NO HAY DATOS DISPONIBLES</Text> // Mensaje si no hay datos
                        )
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        elevation: 5, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    image: {
        width: 80, 
        height: 80, 
        marginRight: 20,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000', // Negro
        textAlign: 'center',
    },
    contentContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
    },
    cardContent: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // Línea de separación entre comunicados
        paddingBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'red', // Titulo en rojo
    },
    date: {
        color: 'lightblue', // Fecha en azul claro
        marginBottom: 5,
    },
    content: {
        color: 'black', // Contenido en negro
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    noData: {
        textAlign: 'center',
        color: '#666',
    },
});



