import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handlerRegister = () =>{
    const user = {
      name: name,
      email: email,
      password: password,
    }
    //send A post request to the backend API
    axios.post("http://192.168.1.108:8000/register", user).then(response => {
      console.log(response)
      Alert.alert("Registration successful", "You have registered successfully")
    setName("")
    setPassword("")
    setEmail("")
    }).catch(err => {
      Alert.alert("Registration Erorr","an error occurred during registration")
      console.log("registration failed", err)
    })
  }

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
            Register your Account
          </Text>
        </View>
        <View className="mt-24 w-80">
          <View className="flex-row items-center bg-gray-300 gap-x-2 py-2 rounded-xl mt-5">
            <Ionicons name="ios-person" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              className="color-gray-500 py-1"
              placeholder="enter your Name"
            />
          </View>
        </View>
        <View className="mt-2 w-80">
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
        <Pressable onPress={handlerRegister} className="w-52 items-center bg-orange-400 rounded-lg ml-auto mr-auto p-3">
          <Text className="color-white text-lg font-semibold tracking-wide">
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          className="mt-4 items-center"
        >
          <Text className="color-gray-500  text-base">
            Already have an account? Sing Ip
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
