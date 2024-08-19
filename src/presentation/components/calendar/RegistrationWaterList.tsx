import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

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

interface Props {
  registrationWater: RegistrationWater;
  press: (registrationWater: RegistrationWater) => void;
}

const groupByBlock = (neighborhoodColonies: NeighborhoodsColonies[]) => {
  return neighborhoodColonies.reduce((acc, neighborhood) => {
    const blockName = neighborhood.blockName || 'Desconocido';
    if (!acc[blockName]) {
      acc[blockName] = [];
    }
    acc[blockName].push(neighborhood);
    return acc;
  }, {} as { [key: string]: NeighborhoodsColonies[] });
};

export const RegistrationWaterList = ({ registrationWater, press }: Props) => {
  const groupedNeighborhoods = groupByBlock(registrationWater.neighborhoodColonies);
  return (
    <View style={styles.itemContainer}>
      {Object.keys(groupedNeighborhoods).map((blockName) => (
        <View key={blockName}>
          {/*<Text style={styles.blockText}>Bloque: {blockName}</Text>*/}
          {groupedNeighborhoods[blockName].map((neighborhood) => (
            <View key={neighborhood.id} style={styles.colonyContainer}>
              <Text style={styles.neighborhoodName}>{neighborhood.name}</Text>
              <Pressable onPress={() => press(registrationWater)} style={styles.moreButton}>
                <Text style={styles.moreButtonText}>Ver más</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  headerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  neighborhoodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  neighborhoodsContainer: {
    paddingLeft: 10,
    marginTop: 10, // Espaciado para separar los bloques
  },
  colonyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4, // Espaciado entre los bloques
  },
  blockText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  moreButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#27AAE1',
    borderRadius: 5,
  },
  moreButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});