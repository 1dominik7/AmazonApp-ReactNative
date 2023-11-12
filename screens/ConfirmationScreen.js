import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import RazorpayCheckout from 'react-native-razorpay';

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const navigation= useNavigation()

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAdresses] = useState([]);

  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.108:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAdresses(addresses);
    } catch (err) {
      console.log("error", err);
    }
  };

  const dispatch = useDispatch()
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  
  const handlePlaceOrder= async() =>{
    try{
        const orderData = {
            userId: userId,
            cartItems:cart,
            totalPrice: total,
            shippingAddress: selectedAddress,
            paymentMethod: selectedOption
        }

        const response = await axios.post("http://192.168.1.108:8000/orders", orderData)
        if(response.status === 200){
            navigation.navigate("Order")
            dispatch(cleanCart())
            setCurrentStep(0)
            console.log("order created successfully", response.data.order)
        } else{
            console.log("error creating order", response.data)
        }
    }catch(err){
        console.log("error", err)
    }
  }

  const pay = async () => {
      try {
        const options = {
          key: "rzp_test_17QxWCCYrmkaH4",
          description: "Adding To Wallet",
          currency: "USD",
          name: "Amazon",
          amount: total * 100,
          prefill: {
            email: "dominikDev@razorpay.com",
            contact: "221133111",
            name: "RazorPay",
          },
          theme: { color: "#F37254"},
          
        };
  
        const data = await RazorpayCheckout.open(options)
  
        console.log(data)
        
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await axios.post(
        "http://192.168.1.108:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }


  return (
    <ScrollView>
      <View className="flex-1 px-8 pt-10">
        <View className="flex-row items-center mb-4 justify-between">
          {steps?.map((step, index) => (
            <View key={index} className="justify-center items-center">
              {index > 0 && (
                <View
                  className={`flex-1 h-0.5 bg-green-400 ${
                    index <= currentStep && "bg-green-500"
                  }`}
                />
              )}
              <View
                className={`w-8 h-8 rounded-full bg-gray-300 justify-center items-center ${
                  index < currentStep && "bg-green-500"
                }`}
              >
                {index < currentStep ? (
                  <Text className="text-lg font-bold color-white">
                    &#10003;
                  </Text>
                ) : (
                  <Text className="text-lg font-bold color-white">
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text className="items-center mt-2">{step.title}</Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep === 0 && (
        <View className="mx-8">
          <Text className="text-lg font-bold">Select Delivery Address</Text>
          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
              key={index}
                onPress={() => setSelectedAddress(item)}
                className="border-0.5 rounded-lg border-gray-400 gap-x-3 p-2 pb-4 my-2 flex-row items-center"
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo name="circle" size={20} color="gray" />
                )}
                <View>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm font-bold">{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text className="text-sm color-gray-700">
                    {item?.houseNo}, {item?.landmark}
                  </Text>
                  <Text className="text-sm color-gray-700">{item?.street}</Text>
                  <Text className="text-sm color-gray-700">Poland, Cracow</Text>
                  <Text className="text-sm color-gray-700">
                    phone No: {item?.mobileNo}
                  </Text>
                  <Text>pin code: {item?.postalCode}</Text>
                  <View className="flex-row items-center">
                    <Pressable className="bg-zinc-200 py-2 px-2 rounded-lg border-2 border-gray-300 mt-2">
                      <Text>Edit</Text>
                    </Pressable>
                    <Pressable className="bg-zinc-200 py-2 px-2 rounded-lg border-2 border-gray-300 ml-2 mt-2">
                      <Text>Remove</Text>
                    </Pressable>
                    <Pressable className="bg-zinc-200 py-2 px-2 rounded-lg border-2 border-gray-300 ml-2 mt-2">
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>
                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        className="bg-teal-600 p-2 rounded-full justify-center items-center mt-2"
                      >
                        <Text className="items-center color-white">
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
      {currentStep === 1 && (
        <View className="mx-8">
          <Text className="text-lg font-bold">
            Choose your delivery options
          </Text>
          <Pressable
            onPress={() => setOption(!option)}
            className="flex-row items-center bg-white p-2 gap-x-2 border-gray-300 border-2 mt-2"
          >
            {option ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo name="circle" size={20} color="gray" />
            )}
            <Text className="flex-1">
              <Text className="color-green-500 font-semibold">
                Tomorrow by 10pm
              </Text>
              - FREE delivery with your Prime membership
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentStep(2)}
            className="bg-yellow-400 p-2 rounded-full justify-center items-center mt-3"
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 2 && (
        <View className="mx-8">
          <Text className="text-lg font-bold">Select your payment Method</Text>
          <Pressable
            onPress={() => setSelectedOption("cash")}
            className="bg-white p-2 border-gray-300 border-2 flex-row items-center gap-x-2 mt-4"
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo name="circle" size={20} color="gray" />
            )}
            <Text>Cash on Delivery</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedOption("card")
              Alert.alert("UPI/Debit card","Pay Online", [
                {
                  text:"Cancel",
                  onPress:() => console.log("Cancel is pressed")
                },
                {
                  text: "OK",
                  onPress: () => pay()
                }
              ])
            }}
            className="bg-white p-2 border-gray-300 border-2 flex-row items-center gap-x-2 mt-4"
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo name="circle" size={20} color="gray" />
            )}
            <Text>UPI / Credit or debit card</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentStep(3)}
            className="bg-yellow-400 p-2 rounded-full justify-center items-center mt-3"
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep === 3 && selectedOption === "cash" && (
        <View className="mx-8">
            <Text className="text-lg font-bold">Order Now</Text>
            <View className="flex-row items-center justify-between gap-x-2 bg-white p-2 border-gray-300 border-2 mt-2"
          >
            <View>
              <Text className="text-lg font-bold">
                Save 5% and never run out
              </Text>
              <Text className="font-base mt-1">
                Turn on auto deliveries
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View className="bg-white p-2 border-gray-300 border-2 mt-2 gap-x-2">
            <Text>Shipping to {selectedAddress?.name}</Text>
            <View className="flex-row items-center justify-between mt-2">
                <Text className="text-base font-semibold color-gray-500">Items</Text>
                <Text className="color-gray text-base">$ {total}</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
                <Text className="text-base font-semibold color-gray-500">Delivery</Text>
                <Text className="color-gray text-base">$ 0</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
                <Text className="text-lg font-bold">Order Total</Text>
                <Text className="color-red-700 text-lg font-bold">$ {total}</Text>
            </View>
          </View>
          <View className="bg-white p-2 border-gray-300 border-2 mt-2 gap-x-2">
            <Text className="text-base color-gray-500">Pay With</Text>
            <Text className="text-base font-semibold mt-2">Pay on delivery (Cash)</Text>
          </View>
          <Pressable 
            onPress={handlePlaceOrder}
            className="bg-yellow-400 p-2 rounded-full justify-center items-center mt-4 gap-x-2">
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
