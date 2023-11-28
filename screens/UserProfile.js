import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const UserProfile = ({ route }) => {
  const { user } = route.params;
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Hello {user}</Text>
    </View>
  );
};

export default UserProfile;
