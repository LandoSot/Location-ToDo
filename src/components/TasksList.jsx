import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { selectLocation } from "../redux/slices/LocationSlice";
import { Text } from "react-native-paper";

const TasksList = ({ showType = "pending" }) => {
  const { completedTasks, pendingTasks, wholeTasks } = useSelector(selectLocation)
  const tasksLength = (showType == "pending") ? pendingTasks.length : completedTasks.length

  const bgColorDictionary = {
    pending: "#6BEC80",
    done: "#F8F259",
    canceled: "#FD5A5A"
  }

  return (
    <View style={styles.container}>
      {tasksLength >= 1 ?
        <FlatList
          style={{ flex: 1, width: '100%' }}
          data={(showType == "pending") ? pendingTasks : wholeTasks}
          keyExtractor={item => item.taskId}
          renderItem={({ item: task, index }) => (
            <View key={index} style={{ width: '100%', borderWidth: 1, padding: '2%', borderRadius: 10, marginBottom: '4%' }}>
              <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: '#CE89FF', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>  Nombre de Tarea: </Text>
                <Text>  {task.name}</Text>
              </View>

              <View style={{ marginTop: '2%', borderBottomWidth: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>  Descripción:</Text>
                <Text>  {task.description}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '60%', paddingTop: '2%' }}>  Distancia requerida: {task.distance} mts</Text>
                <Text style={{ width: '40%', backgroundColor: bgColorDictionary[task.status], borderBottomRightRadius: 5, paddingTop: '2%' }}>  Estatus: Pendiente</Text>
              </View>

              <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>  Notificated: </Text>
                <Text>  {`${task.notificated}`}</Text>
              </View>
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
  }
})
