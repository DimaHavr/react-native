import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";
const MainTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
import PlusIcon from "react-native-vector-icons/AntDesign";
import UserIcon from "react-native-vector-icons/Feather";
import PostsIcon from "react-native-vector-icons/AntDesign";

export const useRoute = (isAuth) => {
  return (
    <>
      {!isAuth ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      ) : (
        <MainTab.Navigator
          initialRouteName="Posts"
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarShowLabel: false,
          }}
        >
          <MainTab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, size, color }) => (
                <View style={focused && styles.icon}>
                  <PostsIcon
                    focused={focused}
                    name="appstore-o"
                    size={25}
                    color={focused ? "#ffffff" : "#212121"}
                  />
                </View>
              ),
            }}
            name="Posts"
            component={PostsScreen}
          />
          <MainTab.Screen
            options={{
              headerTitle: "Создать публикацию",
              tabBarIcon: ({ focused, size, color }) => (
                <View style={focused && styles.icon}>
                  <PlusIcon
                    focused={focused}
                    name="plus"
                    size={25}
                    color={focused ? "#ffffff" : "#212121"}
                  />
                </View>
              ),
            }}
            name="CreatePosts"
            component={CreatePostsScreen}
          />
          <MainTab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, size, color }) => (
                <View style={focused && styles.icon}>
                  <UserIcon
                    focused={focused}
                    name="user"
                    size={25}
                    color={focused ? "#ffffff" : "#212121"}
                  />
                </View>
              ),
            }}
            name="Profile"
            component={ProfileScreen}
          />
        </MainTab.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 35,
    paddingHorizontal: 60,
  },
  logOut: {
    color: "#BDBDBD",
    paddingRight: 16,
  },
  backArrow: {
    color: "#212121",
    paddingLeft: 16,
  },
});
