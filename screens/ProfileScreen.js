import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import moment from 'moment';

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [option, setOption] = useState('orders')
  const navigation = useNavigation();
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate("Home")}>
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={require("../assets/images/amazonLogo.png")}
        />
        </Pressable>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.108:8000/profile/${userId}`
        );
        const { user } = res.data;
        setUser(user);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchUserProfile();
  }, []);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("authToken clear");
    navigation.navigate("Login");
  };

  const fav = useSelector((state) => state.fav.fav);

  useEffect(() => {
    const fetchOrders = async () =>{
      try{
        const response = await axios.get(`http://192.168.1.108:8000/orders/${userId}`)
        const orders = response.data.orders
        setOrders(orders)

        setLoading(false)
      }catch(err){
        console.log("error",err)
      }
    }
    fetchOrders()
  },[])
  console.log(orders)

  const ordersHandler = () =>{
    setOption('orders')
  }

  const favHandler = () =>{
    setOption('favourite')
  }

  const favAccount = () =>{
    setOption('account')
  }


  return (
    <ScrollView className="p-2 flex-1 bg-white">
      <Text className="text-base font-bold">Welcome {user?.name}</Text>
      <View className="flex-row items-center gap-x-2 mt-2">
        <Pressable onPress={() => ordersHandler()}  className={`w-1/2 p-2 bg-gray-300 rounded-full flex-1 items-center border-2 border-transparent ${option === 'orders' ? 'border-teal-400' : ''}`}>
          <Text>Your orders</Text>
        </Pressable>
        <Pressable onPress={() => favAccount()}  className={`w-1/2 p-2 bg-gray-300 rounded-full flex-1 items-center border-2 border-transparent ${option === 'account' ? 'border-teal-400' : ''}`}>
          <Text>Your Account</Text>
        </Pressable>
      </View>
      <View className="flex-row items-center gap-x-2 mt-2">
        <Pressable onPress={() => favHandler()} className={`w-1/2 p-2 bg-gray-300 rounded-full flex-1 items-center border-2 border-transparent  ${option === 'favourite' ? 'border-teal-400' : ''}`}>
          <Text>Favourite ({fav.length})</Text>
        </Pressable>
        <Pressable
          onPress={logout}
          className="w-1/2 p-2 bg-gray-300 rounded-full flex-1 items-center"
        >
          <Text>Logout</Text>
        </Pressable>
      </View>
      <ScrollView  className="flex flex-col">
        {loading ? (
          <Text>Loading...</Text>
        ) : 
        (option === 'orders' &&
        (orders.length > 0 ? (
          orders.map((order) => (
            <Pressable className="rounded-xl border-gray-300 m-3 border-2 p-3"
              key={order._id}
            >
              <Text className="font-semibold">OrderId: {order._id}</Text>
              <Text className="font-semibold">Data of Order: {moment(order?.createdAt).format("DD MMM YY, h:mm a")}</Text>
              <Text className="font-semibold">Payment Method: {order.paymentMethod}</Text>
              <Text className="font-semibold">Total Price: {order.totalPrice} $</Text>
              {order.products?.map((product) => (
                <View 
                className="my-2 flex-row items-center" 
                key={product._id}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 120, height: 120, resizeMode: "contain" }}
                  />
                  <View className="gap-y-1">
                    <Text className="w-52">{product.name.slice(0,100)+"..."}</Text>
                    <Text className="w-52">Quantity: {product.quantity}</Text>
                    <Text className="w-52">Price: {product.price} $</Text>
                  </View>
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )
        )
       )
       ||
       (option === 'favourite' &&
       <View className="flex-row flex-wrap">
        {fav?.map(item =>
          (
            <Pressable 
            onPress={() =>  navigation.navigate("Info", {
              id: item.id,
              title: item.title,
              price: item?.price,
              carouselImages: item?.carouselImages,
              image: item?.image,
              color: item?.color, 
              size: item?.size,
              oldPrice: item?.oldPrice,
              item: item,
            })}
            className="mt-2 p-2 rounded-xl b-1 border-gray-400 mx-2 justify-center items-center"
            key={item._id}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 140, height: 160, resizeMode: "contain" }}
                  />
            </Pressable>
            )
        )}
        </View>
       )
       ||
       (option === 'account' &&
       <View className="flex flex-col p-3 w-full" >
        <Text className="font-bold text-base">User Information</Text>
        <View className="border-2 border-gray-300 p-2 rounded-lg my-1">
            <Text className="font-semibold" >Username: {user.name}</Text>
            <Text className="font-semibold">Email: {user.email}</Text>
            <Text className="font-semibold">Account created: {moment(user?.createdAt).format("DD MMM YY")}</Text>
        </View>
        <Text className="font-bold text-base">Your Addresses</Text>
            {user?.addresses?.map(address =>
              (
                <View className="border-2 border-gray-300 p-2 rounded-lg my-1">
                  <Text>Name: {address.name}</Text>
                  <Text>Street: {address.street}</Text>
                  <Text>Postal Code: {address.postalCode}</Text>
                  <Text>houseNo: {address.houseNo}</Text>
                  <Text>Landmark: {address.landmark}</Text>
                  <Text>Mobile Number: {address.mobileNo}</Text>
                </View> 
              ))}
        </View>    
       )
       }
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
