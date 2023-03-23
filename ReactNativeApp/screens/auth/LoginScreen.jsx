import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};
export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = () => {
    const { password, email } = state;
    if (!email || !password) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../assets/images/photo_bg.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? -245 : 0}
        >
          <View style={styles.container}>
            <Text style={styles.headerTitle}>Войти</Text>
            <View style={styles.form}>
              <TextInput
                placeholder="Адрес электронной почты"
                style={styles.input}
                name="email"
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                placeholder="Пароль"
                style={styles.input}
                secureTextEntry={isPasswordVisible}
                name="password"
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                activeOpacity={0.8}
              >
                <Text style={styles.inputPassText}>
                  {!isPasswordVisible ? "Скрыть" : "Показать"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.bottomText}>
                Нет аккаунта? Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: Platform.OS == "ios" ? 489 : 499,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "content",
  },

  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },

  inputPassText: {
    fontFamily: "Roboto-Regular",
    position: "absolute",
    bottom: 32,
    left: 80,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#1B4371",
  },

  input: {
    fontFamily: "Roboto-Regular",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffffff",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f6f6f6",
    paddingLeft: 16,
    color: "#212121",
    textAlign: "left",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,
  },

  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 42,
    marginBottom: 16,
    marginHorizontal: 16,
  },

  btnText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 19,
  },
  bottomText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    paddingBottom: 141,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },

  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    paddingTop: 32,
    paddingBottom: 32,
  },
});
