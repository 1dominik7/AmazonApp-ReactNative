import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  
  useEffect(()=>{
    const checkLoginStatus = async () =>{
      try{
        const token = await AsyncStorage.getItem("authToken")

        if(token){
          navigation.replace("Main")
        }
      }catch(err){
        console.log("error message", err)
      }
    }
    checkLoginStatus()
  },[])

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post("http://192.168.1.108:8000/login", user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Main");
    }).catch(error => {
      Alert.alert("Login Error", "Invalid Email")
      console.log(error)
    })
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={require("../assets/images/amazonLogo.png")}
        />
      </View>
      <KeyboardAvoidingView>
        <View className="items-center">
          <Text className="text-xl font-bold mt-10 color-black-500">
            Login In to your Account
          </Text>
        </View>
        <View className="mt-24 w-80">
          <View className="flex-row items-center bg-gray-300 gap-x-2 py-2 rounded-xl mt-5">
            <MaterialIcons name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="color-gray-500 py-1"
              placeholder="enter your Email"
            />
          </View>
        </View>
        <View className="mt-2 w-80">
          <View className="flex-row items-center bg-gray-300 gap-x-2 py-2 rounded-xl mt-5">
            <AntDesign name="lock1" size={24} color="gray" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              className="color-gray-500 py-1"
              placeholder="enter your Pasword"
            />
          </View>
        </View>
        <View className="flex-row mt-4 items-center justify-between -ml-2">
          <Text>Keep me logged in</Text>

          <Text className="color-blue-500 font-semibold">Forgot Password</Text>
        </View>
        <View className="mt-24" />
        <Pressable
          onPress={handleLogin}
          className="w-52 items-center bg-orange-400 rounded-lg ml-auto mr-auto p-3"
        >
          <Text className="color-white text-lg font-semibold tracking-wide">
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          className="mt-4 items-center"
        >
          <Text className="color-gray-500  text-base">
            Don't have an account? Sing Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
