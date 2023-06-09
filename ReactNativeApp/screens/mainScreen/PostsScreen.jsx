import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { authSignOutUser } from "../../redux/auth/authOperations";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
const NestedStack = createStackNavigator();
import Home from "../nestedScreens/Home";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import ArrowIcon from "react-native-vector-icons/AntDesign";
import LogOutIcon from "react-native-vector-icons/MaterialIcons";

export default function PostsScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        options={{
          headerTitle: "Публикации",
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.8} onPress={signOut}>
              <LogOutIcon style={styles.logOut} name="logout" size={24} />
            </TouchableOpacity>
          ),
        }}
        name="Home"
        component={Home}
      />
      <NestedStack.Screen
        options={{
          headerTitle: "Местоположение",
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowIcon style={styles.backArrow} name="arrowleft" size={24} />
            </TouchableOpacity>
          ),
        }}
        name="Map"
        component={MapScreen}
      />
      <NestedStack.Screen
        options={{
          headerTitle: "Комментарии",
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowIcon style={styles.backArrow} name="arrowleft" size={24} />
            </TouchableOpacity>
          ),
        }}
        name="Comments"
        component={CommentsScreen}
      />
    </NestedStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  backArrow: {
    color: "#212121",
    paddingLeft: 16,
  },
  logOut: {
    color: "#BDBDBD",
    paddingRight: 16,
  },
});
