import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { useRef } from 'react';

const OrderScreen = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
          navigation.replace("Main");
        }, 2000);
      }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        loop={true}
        autoPlay
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order Has been Recieved
      </Text>
      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        loop={true}
        autoPlay
        speed={0.7}
      />
    </SafeAreaView>
  );
};


export default OrderScreen

const styles = StyleSheet.create({})