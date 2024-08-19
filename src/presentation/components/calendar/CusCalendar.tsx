import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export const CusCalendar = ({ onDateSelect, selectedDate }: Props) => {
  const today = new Date();

  //poder agregar mas semanas
  const [week, setWeek] = useState<Date>(today);


  // funcion para obtener el rango de la semana
  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    const end = new Date(date);

    // Ajustar el inicio de la semana al Domingo
    const dayOfWeek = start.getDay(); // Domingo = 0
    start.setDate(start.getDate() - dayOfWeek);

    // Fin de la semana (Sábado)
    end.setDate(start.getDate() + 6);

    console.log('start: ', start);
    console.log('end: ', end);

    return { startDate: start, endDate: end };
  };

  const { startDate, endDate } = getWeekRange(week);

  // generar los dias de la semana
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    weekDays.push(day.toISOString().split('T')[0]);
  }

  console.log('Días de la semana:', weekDays);

  //botones
  const handlePrevWeek = () => {
    const prevWeek = new Date(week);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setWeek(prevWeek);
  }

  const handleNextWeek = () => {
    const nextWeek = new Date(week);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setWeek(nextWeek);
  }

  //ir al dia actual
  const handleToday = () => {
    setWeek(today);
    onDateSelect(today.toISOString().split('T')[0]);
  };

  console.log('weekDays: ', weekDays);


  return (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
        <View style={styles.calendarHeader}>
          <Pressable onPress={handlePrevWeek} style={styles.arrowButton}>
            <Text style={styles.arrowText}>{'<'}</Text>
          </Pressable>
          <View style={styles.monthContainer}>
            <Text style={styles.monthYearText}>
              {`${week.toLocaleString('es-ES', { month: 'long' })} ${week.getFullYear()}`}
            </Text>
            <Pressable
              onPress={handleToday}
              style={({ pressed }) => [
                styles.todayButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Text style={styles.todayButtonText}>{today.getDate()}</Text>
            </Pressable>
          </View>
          <Pressable onPress={handleNextWeek} style={styles.arrowButton}>
            <Text style={styles.arrowText}>{'>'}</Text>
          </Pressable>
        </View>
        <View style={styles.weekDaysContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {weekDays.map((day, index) => (
            <Pressable
              key={index}
              style={[
                styles.dayButton,
                {
                  backgroundColor: selectedDate === day ? 'white' : 'transparent',
                  borderColor: selectedDate === day ? '#27AAE1' : 'transparent',
                  //borderWidth: selectedDate === day ? 2 : 0,
                  borderRadius: 20,
                },
              ]}
              onPress={() => onDateSelect(day)}
            >
              <Text style={[styles.dayButtonText, { color: selectedDate === day ? '#27AAE1' : 'black' }]}>
                { day.split('-')[2] }
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  calendarBox: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#27AAE1',
    paddingBottom: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowButton: {
    paddingHorizontal: 10,
  },
  arrowText: {
    fontSize: 18,
    color: 'white',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#27AAE1',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    flex: 1,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  dayButton: {
    width: '14.28%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dayButtonText: {
    fontSize: 14,
  },
  todayButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  monthContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
