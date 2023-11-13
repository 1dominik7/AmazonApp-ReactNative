import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { addToFav, removeFromFav } from "../redux/FavReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;

  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const buyNow = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    navigation.navigate("Cart");
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const fav = useSelector((state) => state.fav.fav);
  console.log(fav);

  const toggleAddFav = (item) => {
    dispatch(addToFav(item));
  };

  const toggleRemoveFav = (item) => {
    dispatch(removeFromFav(item));
  };

  console.log("params",route?.params)

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <View className="sticky top-0 bg-teal-400 p-3 flex-row items-center">
        <Pressable className="flex-row items-center mx-4 bg-white space-x-2 rounded-md h-10 flex-1 mt-5">
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search Amazon.shop" />
        </Pressable>
        <Feather name="mic" size={24} color="black" style={{ marginTop: 20 }} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route?.params?.carouselImages?.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            key={index}
            source={{ uri: item }}
          >
            <View className="p-2 flex-row items-center justify-between">
              <View className="w-12 h-12 rounded-full justify-center items-center flex-row bg-red-600">
                <Text className="color-white items-center font-semibold ml-2">
                  20% off
                </Text>
              </View>
              <View className="w-12 h-12 rounded-full justify-center items-center flex-row bg-gray-300">
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            {fav.map((item) => item.id).includes(route?.params?.id) ? (
              <Pressable
                onPress={() => toggleRemoveFav(route?.params?.item)}
                className="w-12 h-12 rounded-full justify-center items-center flex-row bg-gray-300 mt-auto ml-2 mb-4"
              >
                <AntDesign name="heart" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => toggleAddFav(route?.params?.item)}
                className="w-12 h-12 rounded-full justify-center items-center flex-row bg-gray-300 mt-auto ml-2 mb-4"
              >
                <AntDesign name="hearto" size={24} color="black" />
              </Pressable>
            )}
          </ImageBackground>
        ))}
        {route?.params?.image &&
          <ImageBackground
            style={{ width, height, marginTop: 25 }}
            source={ route?.params?.image }
            imageStyle={{resizeMode: "contain" }}
          >
            <View className="p-2 flex-row items-center justify-between">
              <View className="w-12 h-12 rounded-full justify-center items-center flex-row bg-red-600">
                <Text className="color-white items-center font-semibold ml-2">
                  20% off
                </Text>
              </View>
              <View className="w-12 h-12 rounded-full justify-center items-center flex-row bg-gray-300">
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            {fav.map((item) => item.id).includes(route?.params?.id) ? (
              <Pressable
                onPress={() => toggleRemoveFav(route?.params?.item)}
                className="w-12 h-12 rounded-full justify-center items-center flex-row bg-gray-300 mt-auto ml-2 mb-4"
              >
                <AntDesign name="heart" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => toggleAddFav(route?.params?.item)}
                className="w-12 h-12 rounded-full justify-center items-center flex-row bg-gray-300 mt-auto ml-2 mb-4"
              >
                <AntDesign name="hearto" size={24} color="black" />
              </Pressable>
            )}
          </ImageBackground>
        }
      </ScrollView>
      <View className="p-2">
        <Text className="text-sm font-semibold">{route?.params?.title}</Text>
        <Text className="text-xl font-bold mt-2">$ {route?.params?.price}</Text>
      </View>
      <Text className="h-1 border-gray-100 border-2" />
      <View className="flex-row items-center p-2">
        <Text>Color: </Text>
        <Text className="font-bold">{route?.params?.color}</Text>
      </View>
      <View className="flex-row items-center p-2">
        <Text>Size: </Text>
        <Text className="font-bold">{route?.params?.size}</Text>
      </View>
      <Text className="h-1 border-gray-100 border-2" />
      <View className="p-2">
        <Text className="text-sm font-bold my-2">
          Total : $ {route?.params?.price}
        </Text>
        <Text className="color-teal-400">
          FREE delivery Tomorow bt 3P.M Order within 10hrs 30mins
        </Text>
        <View className="flex-row my-2 items-center gap-x-2">
          <Ionicons name="location" size={24} color="black" />
          <Text className="text-sm font-semibold">
            Deliver To Dominik - Dębica 39-207
          </Text>
        </View>
      </View>
      <Text className="color-green-500 my-2 mx-2 font-semibold">IN Stock</Text>
      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        className="bg-yellow-400 p-2 rounded-lg justify-center items-center mx-2 my-2"
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => buyNow(route?.params?.item)}
        className="bg-amber-500 p-2 rounded-lg justify-center items-center mx-2 my-2 mb-6"
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
