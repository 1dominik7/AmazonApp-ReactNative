import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
    console.log(item)
  };

  return (
    <Pressable className="m-5" onPress={() => navigation.navigate("Info", {
      id: item.id,
      title: item.title,
      price: item?.price,
      image: item?.image,
      color: item?.color, 
      size: item?.size,
      oldPrice: item?.oldPrice,
      item: item,
    })}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} className="w-36 mt-2">
        {item?.title}
      </Text>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-sm font-bold">$ {item?.price}</Text>
        <Text className="color-yellow-400 font-bold">
          {item?.rating.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        className="bg-yellow-400 p-2 rounded-full justify-center items-center mx-2 my-2"
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
