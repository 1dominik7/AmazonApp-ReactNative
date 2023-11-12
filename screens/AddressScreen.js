import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode';
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {

  const navigation = useNavigation()

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const {userId, setUserId} = useContext(UserType)

  useEffect(() => {
    const fetchUser = async() => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
    }
    fetchUser();
  },[]);

  console.log(userId) 
  

  const handleAddAddress = () =>{
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode
    }

    axios.post("http://192.168.1.108:8000/addresses", {userId, address}).then((response) =>{
      Alert.alert("Success","Addresses added successfully")
      setName("")
      setMobileNo("")
      setHouseNo("")
      setStreet("")
      setLandmark("")
      setPostalCode("")

      setTimeout(() => {
        navigation.goBack()
      },500)
    }).catch(err => {
      Alert.alert("Error", "Failed to add address")
      console.log("error",err)
    })
  } 

  return (
    <ScrollView>
      <View className="h-12 bg-teal-400" />
      <View className="p-2">
        <Text className="text-xl font-bold">Add a new Address</Text>
        <TextInput
          placeholderTextColor={"black"}
          placeholder="Poland"
          className="p-2 border-gray-300 border-2 mt-2 rounded-sm"
        />
        <View className="my-3">
          <Text className="text-base font-bold">
            Full name (First and last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            className="p-2 border-gray-300 border-2 mt-2 rounded-sm"
            placeholderTextColor={"black"}
            placeholder="enter your name"
          />
        </View>
        <View>
          <Text className="text-base font-bold">Mobile number</Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            className="p-2 border-gray-300 border-2 mt-2 rounded-sm"
            placeholderTextColor={"black"}
            placeholder="enter your mobile number"
          />
        </View>
        <View className="my-3">
          <Text className="text-base font-bold">
            Flat, House No, Building, Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            className="p-2 border-gray-300 border-2 mt-2 rounded-sm"
            placeholderTextColor={"black"}
            placeholder=""
          />
        </View>
        <View>
          <Text className="text-base font-bold">
            Area, Street, sector, village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            className="p-2 border-gray-300 border-2 mt-2 rounded-sm"
            placeholderTextColor={"black"}
            placeholder=""
          />
        </View>
        <View className="my-3">
          <Text className="text-base font-bold">Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            className="p-2 border-gray-300 border-2 mt-2 rounded-sm"
            placeholderTextColor={"black"}
            placeholder="Eg near Hilton hotel"
          />
        </View>
        <View>
          <Text className="text-base font-bold">Pincode</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            className="p-2 border-gray-300 border-2 mt-2 rounded-sm"
            placeholderTextColor={"black"}
            placeholder="Enter Pincode"
          />
        </View>
        <Pressable 
        onPress={handleAddAddress}
        className="bg-yellow-400 p-4 rounded-lg justify-center items-center mt-4">
          <Text className="font-bold">Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
