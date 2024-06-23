import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../redux/slices/LocationSlice";
import { Text } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ToggleTaskStatus_Thunk } from "../redux/thunks/Tasks";

const TasksList = ({ showType = "pending" }) => {
  const { completedTasks, pendingTasks, wholeTasks } = useSelector(selectLocation)
  const tasksLength = (showType == "pending") ? pendingTasks.length : completedTasks.length
  const dispatch = useDispatch()

  const statusDictionary = {
    pending: "Pendiente",
    done: "Completada",
    canceled: "#FD5A5A"
  }

  return (
    <View style={styles.container}>
      {tasksLength >= 1 ?
        <FlatList
          style={{ flex: 1, width: '100%' }}
          data={(showType == "pending") ? pendingTasks : completedTasks}
          keyExtractor={item => item.taskId}
          renderItem={({ item: task, index }) => (
            <View key={index} style={{ width: '100%', borderWidth: 1, padding: '2%', borderRadius: 10, marginBottom: '4%', flexDirection: 'row' }}>
              <View style={{ width: '80%' }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: '#CE89FF', borderTopLeftRadius: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>  Nombre de Tarea: </Text>
                  <Text>{task.name}</Text>
                </View>

                <View style={{ marginTop: '1%', borderBottomWidth: 1, height: 75 }}>
                  <Text style={{ fontWeight: 'bold' }}>  Descripción:</Text>
                  <Text>  {task.description}</Text>
                </View>

                <View style={{ flexDirection: 'row', paddingTop: '1%' }}>
                  <Text style={{ fontWeight: 'bold' }}>  Distancia requerida: </Text>
                  <Text>{task.distance} mts</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: '1%', borderBottomWidth: 1 }}>
                  <Text style={{ fontWeight: 'bold', borderBottomLeftRadius: 5 }}>  Estatus: </Text>
                  <Text>{statusDictionary[task.status]}</Text>
                </View>
                {(showType == "done") &&
                  <View style={{ flexDirection: 'row', paddingTop: '1%', borderBottomWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', borderBottomLeftRadius: 5 }}>  Activacion: </Text>
                    <Text>{task.activationTimestamp}</Text>
                  </View>
                }

                {/* <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>  Notificated: </Text>
                  <Text>  {`${task.notificated}`}</Text>
                </View> */}
              </View>

              <TouchableOpacity
                onPress={() => dispatch(ToggleTaskStatus_Thunk({
                  task,
                  action: showType == "pending" ? 'complete' : 'reactivate'
                }))}
                style={{ ...styles.actionButton, backgroundColor: showType == "pending" ? '#32BA40' : '#EA9432' }}
              >
                {showType == "pending" ?
                  <Ionicons name="checkmark-done-sharp" size={30} color="black" /> :
                  <MaterialCommunityIcons name="book-refresh-outline" size={30} color="black" />}
                <Text style={{ fontSize: 12 }}>{showType == "pending" ? 'Completar' : 'Reactivar'}</Text>
              </TouchableOpacity>
            </View>
          )}
        /> :
        <Text style={{ fontSize: 24 }}>
          No hay tareas {(showType == "pending") ? "pendientes" : "completadas"}
        </Text>
      }
    </View>
  )
}

export default TasksList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '4%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButton: {
    width: '20%',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
