import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
  ActivityIndicator,
} from "react-native";
import MapIcon from "react-native-vector-icons/Feather";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import PhotoIcon from "react-native-vector-icons/MaterialIcons";

export default function CreatePostsScreen({ navigation }) {
  const { login, userId, email } = useSelector((state) => state.auth);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const postParams = photo && title.length && locationName;
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (cameraRef.current && hasCameraPermission) {
        setIsTakingPicture(true);
        const options = { quality: 1.0, base64: true, skipProcessing: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.uri;

        if (source) {
          setPhoto(source);
          setIsTakingPicture(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const sendPost = () => {
    uploadPostToServer();
    navigation.navigate("Home");
    setPhoto(null);
    setTitle("");
    setLocationName("");
    return;
  };

  const uploadPostToServer = async () => {
    const photoLink = await uploadPhotoToServer();
    const docRef = await addDoc(collection(db, "posts"), {
      userId,
      login,
      email,
      photoLink,
      title,
      locationName,
      location: location.coords,
      createdAt: serverTimestamp(),
    });

    console.log("Document written with ID: ", docRef.id);
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `postImage/${uniquePostId}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.postImg} />
          ) : (
            <Camera
              style={styles.camera}
              ref={cameraRef}
              onCameraReady={onCameraReady}
            >
              {isTakingPicture ? (
                <ActivityIndicator
                  style={styles.photoIconBox}
                  size="large"
                  color="#ffffff"
                />
              ) : (
                <TouchableOpacity
                  disabled={!isCameraReady || isTakingPicture}
                  style={styles.photoIconBox}
                  onPress={takePhoto}
                >
                  <PhotoIcon
                    style={styles.photoIcon}
                    name="photo-camera"
                    size={25}
                    color="#fffffd"
                  />
                </TouchableOpacity>
              )}
            </Camera>
          )}

          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.textImg}>Редактировать фото</Text>
          </TouchableOpacity>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? -190 : -70}
          >
            <View style={styles.form}>
              <TextInput
                placeholder="Название..."
                style={styles.input}
                name="title"
                value={title}
                onChangeText={(value) => setTitle(value)}
              />
              <TextInput
                placeholder="Местность..."
                style={{ ...styles.input, paddingLeft: 30 }}
                name="locationName"
                value={locationName}
                onChangeText={(value) => setLocationName(value)}
              />
              <MapIcon
                style={styles.mapIcon}
                name="map-pin"
                size={25}
                color="#BDBDBD"
              />
            </View>
            <TouchableOpacity
              disabled={!postParams}
              onPress={sendPost}
              activeOpacity={postParams && 0.6}
              style={
                postParams
                  ? { ...styles.btn, backgroundColor: "#FF6C00" }
                  : { ...styles.btn }
              }
            >
              <Text
                style={
                  postParams
                    ? { ...styles.btnText, color: "#ffffff" }
                    : { ...styles.btnText }
                }
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity
          disabled={!photo}
          onPress={() => setPhoto(null)}
          activeOpacity={0.6}
          style={styles.iconBox}
        >
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
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },

  camera: {
    position: "relative",
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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    width: 60,
    height: 60,
    bottom: 90,
    left: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    zIndex: 100,
  },
  photoIcon: {
    alignSelf: "center",
  },
});
