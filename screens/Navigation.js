import { View, Text } from "react-native";
import React from "react";

const Navigation = ({ navigate }) => {
  return (
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
  );
};

export default Navigation;
