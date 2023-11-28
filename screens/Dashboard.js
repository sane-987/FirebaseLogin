import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import { firebase } from "../database/firebase.config";
import MovieList from "../components/MovieList";

const Dashboard = ({ navigation }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data()["firstName"]);
          //console.log(snapshot.data())
        } else console.log("User does not exist");
      });
  }, []);

  return (
    <>
      <ScrollView>
        <MovieList user={user} />
      </ScrollView>
      <View
        style={tw`items-center p-5 flex flex-row justify-around bg-slate-950`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", { user: user })}
        >
          <AntDesignIcon name="user" size={20} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesignIcon name="hearto" size={20} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AntDesignIcon name="setting" size={20} color="#4F8EF7" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Dashboard;
