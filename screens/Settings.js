import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { firebase } from "../database/firebase.config";
import tw from "twrnc";
const Settings = () => {
  const logOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-slate-950`}>
      <TouchableOpacity onPress={() => logOut()}>
        <View>
          <AntDesignIcon name="logout" color="#4F8EF7" size={20} />
        </View>
      </TouchableOpacity>
      <Text style={tw`text-white`}>Logout</Text>
    </View>
  );
};

export default Settings;
