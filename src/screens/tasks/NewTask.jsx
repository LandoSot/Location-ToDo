import React from "react";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import MapLocation from "../../components/Map";
import { InputStyles } from "../../styles/Theme";
import { useDispatch, useSelector } from "react-redux";
import { resetTaskLocation, selectLocation } from "../../redux/slices/Location";
import { AddTask_Thunk } from "../../redux/thunks/Tasks";

const NewTask = ({ navigation }) => {
  const { colors } = useTheme()
  const { taskCoords } = useSelector(selectLocation)
  const dispatch = useDispatch()

  const initialValues = {
    name: "",
    description: "",
    distance: null
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('Nombre de la tarea requerido'),
    description: yup.string().required('Descripción de la tarea requerida'),
    distance: yup.number().required('Distancia mínima requerida').positive('La distancia debe ser un número positivo'),
  });

  React.useEffect(() => {
    return () => dispatch(resetTaskLocation())
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        dispatch(AddTask_Thunk({ values, navigation }))
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit }) => (
        <>
          <ScrollView style={styles.formikContainer}>
            {/** ALIAS DE TAREA */}
            <View style={{ flex: 1, paddingHorizontal: '4%' }}>
              <View style={{ flexDirection: 'row', marginBottom: '1%' }}>
                <Text style={{ fontSize: 16 }}>Nombre de la tarea:</Text>
                <Text style={{ marginLeft: '1%', color: colors.error }}>*</Text>
              </View>
              <TextInput
                value={values.name}
                placeholder={"Recoger mascota"}
                onChangeText={value => setFieldValue('name', value)}
                {...InputStyles}
              />
              {errors.name && touched.name &&
                <Text style={{ color: colors.error }}>{errors.name}</Text>
              }

              {/** DESCRIPCIÓN DE TAREA */}
              <View style={{ flexDirection: 'row', marginBottom: '1%', marginTop: '4%' }}>
                <Text style={{ fontSize: 16 }}>Descripción tarea:</Text>
                <Text style={{ marginLeft: '1%', color: colors.error }}>*</Text>
              </View>
              <TextInput
                {...InputStyles}
                style={{ height: 150 }}
                value={values.description}
                multiline={true}
                placeholder={"Acudir a la veterinaria"}
                onChangeText={value => setFieldValue('description', value)}
              />
              {errors.description && touched.description &&
                <Text style={{ color: colors.error }}>{errors.description}</Text>
              }

              {/** RADIO DE ACTIVACIÓN */}
              <View style={{ flexDirection: 'row', marginBottom: '1%', marginTop: '4%' }}>
                <Text style={{ fontSize: 16 }}>Distancia mínima (metros):</Text>
                <Text style={{ marginLeft: '1%', color: colors.error }}>*</Text>
              </View>
              <TextInput
                value={values.distance}
                placeholder={"100"}
                onChangeText={value => setFieldValue('distance', value)}
                {...InputStyles}
              />
              {errors.distance && touched.distance &&
                <Text style={{ color: colors.error }}>{errors.distance}</Text>
              }

              <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                <Text style={{ fontSize: 16 }}>Ubicación:</Text>
                <Text style={{ marginLeft: '1%', fontWeight: 'bold', fontSize: 16, borderBottomWidth: 1 }}>
                  {taskCoords ? 'Área seleccionada' : 'Actual'}
                </Text>
              </View>
              <Button
                style={styles.pickLocation}
                mode={"contained"}
                onPress={() => navigation.navigate('MapTaskLocation')}
              >
                Seleccionar Otra Ubicación
              </Button>
              <MapLocation origin={'newTask'} />
            </View>

          </ScrollView>
          <Button
            mode={"contained"}
            style={{ borderRadius: 0 }}
            onPress={handleSubmit}
            theme={{
              colors: {
                primary: colors.secondary,
              }
            }}
          >
            Registrar Tarea
          </Button>
        </>
      )}
    </Formik>
  )
}

export default NewTask

const styles = StyleSheet.create({
  formikContainer: {
    flex: 1,
    paddingTop: '2%'
    // height: '100%'
  },
  pickLocation: {
    marginTop: '1%',
    // marginHorizontal: '4%',
    borderRadius: 10,
    marginBottom: '2%'
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioButtonContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: '4%',
    paddingVertical: '2%',
    borderRadius: 10
  }
})
