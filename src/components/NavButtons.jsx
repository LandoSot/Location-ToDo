import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const NavButtons = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.multibuttons}>
        <TouchableOpacity style={{ ...styles.tasksButtons, backgroundColor: colors.primary, }}>
          <FontAwesome5 name="tasks" size={35} color={colors.onPrimary} />
          <Text style={{ ...styles.tasksTitles, color: colors.onPrimary, }}>Pendientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...styles.tasksButtons, backgroundColor: colors.primary, }}>
          <MaterialIcons name="history-edu" size={40} color={colors.onPrimary} />
          <Text style={{ ...styles.tasksTitles, color: colors.onPrimary, }}>Historial</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newTaskContainer}>
        <TouchableOpacity
          style={{ ...styles.newTaskButton, backgroundColor: colors.primary, }}
          onPress={() => navigation.navigate('NewTask')}
        >
          <Entypo name="new-message" size={40} color={colors.onPrimary} />
          <Text style={{ ...styles.newTaskTitle, color: colors.onPrimary, }}>Nueva Tarea</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NavButtons

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderRadius: 10
  },
  multibuttons: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tasksButtons: {
    width: '90%',
    alignItems: 'center',
    height: '40%',
    justifyContent: 'center',
    borderRadius: 10
  },
  newTaskContainer: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  newTaskButton: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  newTaskTitle: {
    marginTop: '8%',
    fontWeight: 'bold',
    fontSize: 18
  },
  tasksTitles: {
    marginTop: '4%',
    fontWeight: 'bold',
    fontSize: 18
  }
})
