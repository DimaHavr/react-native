import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 16 }}>
        <Image style={styles.postImg} />
        <View style={styles.commentBox}>
          <Image style={styles.commentImg} />
          <View style={styles.commentTextBox}>
            <Text style={styles.commentText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              dolorum doloribus officia aspernatur veritatis temporibus unde,
            </Text>
            <Text style={styles.dataText}>09 июня, 2020 | 08:40</Text>
          </View>
        </View>
        <View style={styles.commentBox}>
          <Image style={styles.commentImg} />
          <View style={styles.commentTextBox}>
            <Text style={styles.commentText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              dolorum doloribus officia aspernatur veritatis temporibus unde,
            </Text>
            <Text style={styles.dataText}>09 июня, 2020 | 08:40</Text>
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
  postImg: {
    backgroundColor: "#212121",
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 32,
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
});
