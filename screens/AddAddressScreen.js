import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {
    AntDesign,
    Feather,
    MaterialIcons,
  } from "@expo/vector-icons";
import React, { useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserType } from '../UserContext';
import { useContext } from 'react';
import {Entypo} from '@expo/vector-icons'
import axios from 'axios';

const AddAddressScreen = () => {

  const [addresses, setAdresses] = useState([])
  const {userId, setUserId} = useContext(UserType)

    const navigation = useNavigation()

    useEffect(() =>{
      fetchAddresses()
    },[])
  
    const fetchAddresses = async () =>{
      try{
        const response = await axios.get(`http://192.168.1.108:8000/addresses/${userId}`)
        const {addresses} = response.data

        setAdresses(addresses)
      }catch(err){
        console.log("error",err)
      }
    }
    //refresh th eaddresses when the component
    useFocusEffect(
      useCallback(() => {
        fetchAddresses()
      },[])
    )
    console.log("adresses", addresses)

  return (
    <ScrollView showsHorizontalScrollIndicator={false} stickyHeaderIndices={[0]}>
      <View className="bg-teal-400 p-3 flex-row items-center">
        <Pressable className="flex-row items-center mx-4 bg-white space-x-2 rounded-md h-10 flex-1 mt-5">
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search Amazon.shop" />
        </Pressable>
        <Feather name="mic" size={24} color="black" style={{marginTop: 20}} />
      </View>
      <View className="p-3">
            <Text className="text-xl font-bold">Your Addresses</Text>
            <Pressable onPress={() => navigation.navigate("Add")} className="flex-row items-center justify-between mt-2 border-gray-200 border-2 border-l-0 border-r-0 px-2 py-3">
                <Text>Add a new Address</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </Pressable>
            <Pressable>
                {/* {all the added addresses} */}
                {addresses?.map((item, index) =>(
                  <Pressable className="border-2 border-gray-300 p-2 gap-1 my-2">
                    <View className="flex-row items-center gap-1">
                      <Text className="text-sm font-bold">{item?.name}</Text>
                      <Entypo name="location-pin" size={24} color="red"/>
                    </View>
                    <Text className="text-sm color-gray-700">{item?.houseNo}, {item?.landmark}</Text>
                    <Text className="text-sm color-gray-700">{item?.street}</Text>
                    <Text className="text-sm color-gray-700">Poland, Cracow</Text>
                    <Text className="text-sm color-gray-700">phone No: {item?.mobileNo}</Text>
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
                  </Pressable>
                ))}
            </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({})