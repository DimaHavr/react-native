import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import MapIcon from "react-native-vector-icons/Feather";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import PhotoIcon from "react-native-vector-icons/MaterialIcons";

export default function CreatePostsScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          <View>
            <Image style={styles.postImg} />
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.textImg}>Загрузите фото</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoIconBox}>
              <PhotoIcon
                style={styles.photoIcon}
                name="photo-camera"
                size={25}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? -190 : -70}
          >
            <View style={styles.form}>
              <TextInput
                placeholder="Название..."
                style={styles.input}
                name="login"
              />
              <TextInput
                placeholder="Местность..."
                style={{ ...styles.input, paddingLeft: 30 }}
                name="email"
              />
              <MapIcon
                style={styles.mapIcon}
                name="map-pin"
                size={25}
                color="#BDBDBD"
              />
            </View>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
              <Text style={styles.btnText}>Опубликовать</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity activeOpacity={0.6} style={styles.iconBox}>
          <DeleteIcon name="delete" size={25} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  postImg: {
    backgroundColor: "#E8E8E8",
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  textImg: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  form: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  input: {
    fontFamily: "Roboto-Regular",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    height: 50,
    borderRadius: 8,
    color: "#212121",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 19,
    paddingLeft: 5,
  },

  btn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  mapIcon: {
    position: "absolute",
    bottom: 30,
    left: 0,
  },
  iconBox: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 15,
  },
  photoIconBox: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 60,
    height: 60,
    bottom: 120,
    left: 145,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  photoIcon: {
    alignSelf: "center",
  },
});
