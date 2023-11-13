import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQunatity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };


  return (
    <ScrollView className="flex-1 bg-white" stickyHeaderIndices={[0]}>
      <View>
        <View className="bg-teal-400 p-3 flex-row items-center">
          <Pressable
            className="flex-row items-center mx-4 bg-white space-x-2 rounded-md h-10 flex-1 mt-5"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={24}
              color="black"
            />
            <TextInput placeholder="Search Amazon.shop" />
          </Pressable>
          <Feather name="mic" size={24} color="black" style={{marginTop: 20}}/>
        </View>
      </View>
      <View className="p-2 flex-row items-center">
        <Text className="text-lg font-semibold">Subtotal: </Text>
        <Text className="text-xl font-bold">$ {total}</Text>
      </View>
      <Text className="mx-2">EMI details Available</Text>
      <Pressable
        onPress={() => navigation.navigate("Confirm")}
        className="p-2 bg-yellow-400 rounded-lg justify-center items-center m-2"
      >
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>
      <Text className="h-1 border-gray-300 border-b-2 my-3" />
      <View className="mx-2">
        {cart?.map((item, index) => (
          <View
            className="bg-white my-2 border-b-2 gap-y-2 border-gray-300"
            key={index}
          >
            <Pressable className="my-3 flex-row justify-between">
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: "contain" }}
                  source={item?.image} 
                />
              </View>
              <View>
                <Text numberOfLines={3} className="w-36 mt-2">
                  {item?.title}
                </Text>
                <Text className="text-lg font-bold mt-1">$ {item?.price}</Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text className="color-green-400">In Stock</Text>
              </View>
            </Pressable>
            <Pressable className="flex-row items-center gap-x-3">
              <View className="flex-row items-center px-2 py-1 mt-4">
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQunatity(item)}
                    className="bg-gray-300 p-2 rounded-l-lg"
                  >
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    className="bg-gray-300 p-2 rounded-l-lg"
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}
                <Pressable className="bg-white py-2 px-7">
                  <Text className="text-lg">{item?.quantity}</Text>
                </Pressable>
                <Pressable
                  onPress={() => increaseQuantity(item)}
                  className="bg-gray-300 p-2 rounded-l-lg"
                >
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable
                onPress={() => deleteItem(item)}
                className="bg-white p-2 mt-4 rounded-lg border-gray-100 border-2"
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>
            <Pressable className="flex-row items-center gap-x-2 mb-2">
              <Pressable className="bg-white p-2 rounded-lg border-gray-100 border-2">
                <Text>Save For Later</Text>
              </Pressable>
              <Pressable className="bg-white p-2 rounded-lg border-gray-100 border-2">
                <Text>See More Like this</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
