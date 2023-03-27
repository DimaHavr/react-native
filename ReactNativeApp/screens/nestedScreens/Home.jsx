import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import MapIcon from "react-native-vector-icons/Feather";
import CommentsIcon from "react-native-vector-icons/Fontisto";

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postsRef = collection(db, "posts");

      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      });

      return () => unsubscribe();
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          marginBottom: 32,
          height: "100%",
        }}
        data={posts.sort((a, b) => b.createdAt - a.createdAt)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={{ marginTop: 32 }}>
              <View style={styles.userBox}>
                <Image style={styles.userImg} />
                <View>
                  <Text style={styles.userName}>{item.login}</Text>
                  <Text>{item.email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.postsBox}>
              <Image source={{ uri: item.photoLink }} style={styles.postImg} />
              <Text style={styles.textTitle}>{item.title}</Text>
              <View style={styles.infoBox}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      photoLink: item.photoLink,
                    })
                  }
                  style={styles.textInfoBox}
                >
                  <CommentsIcon
                    style={{ transform: [{ scaleX: -1 }], paddingRight: 6 }}
                    name="comment"
                    size={25}
                    color="#BDBDBD"
                  />
                  <Text
                    style={{
                      ...styles.userName,
                      color: "#BDBDBD",
                      paddingLeft: 6,
                    }}
                  >
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: item.location,
                    })
                  }
                  style={{ ...styles.textInfoBox, paddingLeft: 10 }}
                >
                  <MapIcon
                    style={{ marginRight: 6 }}
                    name="map-pin"
                    size={25}
                    color="#BDBDBD"
                  />
                  <Text
                    style={{
                      ...styles.textInfo,
                      textDecorationLine: "underline",
                    }}
                  >
                    {item.locationName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
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
    marginBottom: 16,
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
    flexShrink: 1,
  },
  textInfo: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    flexShrink: 1,
  },
});
