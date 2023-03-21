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
export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitFormBtn = () => {
    setState(initialState);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
                onEndEditing={() => setIsShowKeyboard(false)}
                placeholder="Адрес электронной почты"
                style={styles.input}
                name="email"
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                // onChange={(nativeEvent) => console.log(nativeEvent)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                onEndEditing={() => setIsShowKeyboard(false)}
                placeholder="Пароль"
                style={styles.input}
                secureTextEntry={true}
                name="password"
                onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.inputPassText}>Показать</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btn}
              onPress={submitFormBtn}
            >
              <Text style={styles.btnText}>Войти</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>
              Нет аккаунта? Зарегистрироваться
            </Text>
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
    gap: 16,
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
    color: "#BDBDBD",
    textAlign: "left",
    fontSize: 16,
    lineHeight: 19,
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
