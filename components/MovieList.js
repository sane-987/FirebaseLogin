import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import React, { useEffect, useState } from "react";
import tw from "twrnc";

const MovieList = ({ user }) => {
  const fetchData = async () => {
    const response = await fetch("http://192.168.0.107:5000/getMovieDetails");
    const json = await response.json();
    const [userMovies, setUserMovies] = useState([]);
    //console.log(json)
    setmovieDetails(json);
  };
  const [movieDetails, setmovieDetails] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const movieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => {
        //console.log(item["id"])
        setUserMovies([...userMovies, item["id"]]);
        console.log(userMovies);
      }}
    >
      <View>
        <Image
          source={{ uri: item.moviePoster }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{item.movieTitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw` flex-1 bg-slate-600 justify-center`}>
      <StatusBar hiddern={true} />
      <View style={tw`flex-2 flex-row items-center gap-20`}>
        <Text style={tw`text-slate-950 text-3xl font-bold m-5`}>
          Welcome back {user}
        </Text>
      </View>
      <FlatList
        data={movieDetails}
        renderItem={movieItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={tw`flex-15`}
      ></FlatList>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    width: 100,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});
