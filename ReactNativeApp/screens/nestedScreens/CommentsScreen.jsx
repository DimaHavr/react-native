import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Icon from "react-native-vector-icons/AntDesign";

export default function CommentsScreen({ route }) {
  const { postId, photoLink } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const createComment = async () => {
    const parentDocRef = doc(db, "posts", `${postId}`);
    const subCollectionRef = collection(parentDocRef, "comments");
    await addDoc(subCollectionRef, {
      comment,
      createdAt: serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const parentDocRef = doc(db, "posts", postId);
      const subCollectionRef = collection(parentDocRef, "comments");

      const unsubscribe = onSnapshot(subCollectionRef, (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllComments(comments);
      });

      return () => unsubscribe();
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? -190 : -70}
      >
        <View style={{ height: "100%" }}>
          <View style={{ marginHorizontal: 16 }}>
            <Image source={{ uri: photoLink }} style={styles.postImg} />
          </View>
          <SafeAreaView></SafeAreaView>
          <FlatList
            data={allComments}
            style={{
              marginBottom: 50,
              marginTop: 32,
              marginHorizontal: 16,
              height: "100%",
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentBox}>
                <Image style={styles.commentImg} />
                <View style={styles.commentTextBox}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.dataText}>
                    {new Date(item.createdAt?.toDate()).toLocaleDateString(
                      "en-GB"
                    )}{" "}
                    |{" "}
                    {new Date(item.createdAt?.toDate()).toLocaleTimeString(
                      "en-GB"
                    )}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={styles.form}>
            <TextInput
              placeholder="Комментировать..."
              style={styles.input}
              name="title"
              value={comment}
              onChangeText={(value) => setComment(value)}
            />
            <TouchableOpacity
              disabled={!comment}
              onPress={createComment}
              activeOpacity={0.5}
              style={styles.icon}
            >
              <Icon name="arrowup" size={25} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  postImg: {
    backgroundColor: "#212121",
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
  },
  commentBox: {
    flexDirection: "row",
    marginBottom: 24,
  },
  commentImg: {
    backgroundColor: "#212121",
    alignSelf: "flex-start",
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 16,
  },

  commentTextBox: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    flexShrink: 1,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    flexShrink: 1,
  },
  dataText: {
    alignSelf: "flex-end",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
  },
  form: {
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },
  input: {
    fontFamily: "Roboto-Regular",
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#f6f6f6",
    paddingLeft: 16,
    color: "#212121",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 19,
  },
  icon: {
    position: "absolute",
    bottom: 25,
    right: 10,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    padding: 5,
  },
});
