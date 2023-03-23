import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import MapIcon from "react-native-vector-icons/Feather";
import CommentsIcon from "react-native-vector-icons/Fontisto";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.userBox}>
          <Image style={styles.userImg} />
          <View>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text>email@example.com</Text>
          </View>
        </View>
        <View style={styles.postsBox}>
          <Image style={styles.postImg} />
          <Text style={styles.textTitle}>Title</Text>
          <View style={styles.infoBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Comments")}
              style={styles.textInfoBox}
            >
              <CommentsIcon
                style={{ transform: [{ scaleX: -1 }], marginRight: 6 }}
                name="comment"
                size={25}
                color="#BDBDBD"
              />
              <Text style={{ ...styles.userName, color: "#BDBDBD" }}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textInfoBox}>
              <MapIcon
                style={{ marginRight: 6 }}
                name="map-pin"
                size={25}
                color="#BDBDBD"
              />
              <Text
                style={{ ...styles.textInfo, textDecorationLine: "underline" }}
              >
                Ivano-Frankivs'k Region, Ukraine
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postsBox}>
          <Image style={styles.postImg} />
          <Text style={styles.textTitle}>Title</Text>
          <View style={styles.infoBox}>
            <TouchableOpacity style={styles.textInfoBox}>
              <CommentsIcon
                style={{ transform: [{ scaleX: -1 }], marginRight: 6 }}
                name="comment"
                size={25}
                color="#BDBDBD"
              />
              <Text style={{ ...styles.userName, color: "#BDBDBD" }}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textInfoBox}>
              <MapIcon
                style={{ marginRight: 6 }}
                name="map-pin"
                size={25}
                color="#BDBDBD"
              />
              <Text
                style={{ ...styles.textInfo, textDecorationLine: "underline" }}
              >
                Ivano-Frankivs'k Region, Ukraine
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  userImg: {
    backgroundColor: "#212121",
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userBox: {
    marginLeft: 16,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },

  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
  postsBox: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  postImg: {
    backgroundColor: "#212121",
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },

  textTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  textInfoBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInfo: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
