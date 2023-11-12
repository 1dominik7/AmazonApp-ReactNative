import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import { useContext } from "react";


const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: require("../assets/images/home.jpg"),
      name: "Home",
    },
    {
      id: "1",
      image: require("../assets/images/deals.jpg"),
      name: "Deals",
    },
    {
      id: "2",
      image: require("../assets/images/electronics.jpg"),
      name: "Electronics",
    },
    {
      id: "3",
      image: require("../assets/images/mobiles.jpg"),
      name: "Mobiles",
    },
    {
      id: "4",
      image: require("../assets/images/jewlery.jpg"),
      name: "Jewelery",
    },
    {
      id: "5",
      image: require("../assets/images/fashion.png"),
      name: "Fashion",
    },
  ];

  const images = [
    require("../assets/images/image1.png"),
    require("../assets/images/image2.gif"),
    require("../assets/images/image3.jpg"),
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 300,
      price: 250,
      image:
        require("../assets/images/OnePlusNord.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 1000,
      price: 800,
      image:
      require("../assets/images/SamsungGalaxyS20.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 350,
      price: 250,
      image:
      require("../assets/images/SamsungGalaxyM14.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "Realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 400,
      price: 300,
      image:
      require("../assets/images/RealmeNarzo.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 130,
      price: 100,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 60,
      price: 40,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 90,
      price: 60,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 120,
      price: 80,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];

  const [products, setProducts] = useState([]);

  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [addresses, setAdresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("")

  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        console.log(products)
      } catch (err) {
        console.log("error message", err);
      }
    };
    fetchData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

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

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const scrollRef = useRef();

  const listHandler = (item) =>{
    if(item === 'Home'){
      scrollRef.current?.scrollTo({y: 150, animated: true })
    }
    else if(item ==='Deals')
    scrollRef.current?.scrollTo({y: 700, animated: true })
    else if(item === 'Electronics'){
      setCategory("electronics")
      scrollRef.current?.scrollTo({y: 1100, animated: true })
    }
    else if(item === 'Mobiles'){
      scrollRef.current?.scrollTo({y: 300, animated: true })
    }
    else if ( item === 'Jewelery'){
      setCategory("jewelery")
      scrollRef.current?.scrollTo({y: 1100, animated: true })
    }
    else if ( item === 'Fashion'){
      setCategory("women's clothing")
      scrollRef.current?.scrollTo({y: 1100, animated: true })
    }
  }

  const DATA = [deals]
  const [searchText, onChangeSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  console.log(DATA)

  useEffect(() => {
    const filtered = deals.filter(item =>
      item?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchText === '') {
      return setFilteredData(DATA);
    }
    setFilteredData(filtered);
  }, [searchText]);

  const Item = ({title, item}) => (
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
    className="z-999 bg-gray-200 p-2 border-b-2">
      <Text className="z-999">{title?.slice(0, 70)}...</Text>
    </Pressable>
  );

  const renderItem = ({item}) => <Item title={item.title} item={item} />;

  return (
    <>
      <SafeAreaView className="flex-1 bg-white" >
        <ScrollView stickyHeaderIndices={[0]} ref={scrollRef} >
          <View className="bg-teal-400 p-3 flex-row items-center">
            <Pressable
              className="flex-row items-center mx-4 bg-white space-x-2 rounded-md h-10 flex-1 mt-5 relative"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={24}
                color="black"
              />
              <TextInput className="h-20 m-2 pl-5 border-lg" placeholder="Search Amazon.shop"  onChangeText={newText => onChangeSearch(newText)}/>
              {searchText !=="" &&
              <ScrollView   className="absolute top-10 w-72 h-50 overflow-scroll z-99">
              <FlatList
              scrollEnabled={false}
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              />
              </ScrollView>
              }
            </Pressable>
            <Feather name="mic" size={24} color="black" style={{marginTop: 20}}/>
          </View>
          <Pressable className="flex-row items-center gap-x-2 p-3 bg-teal-200">
            <Ionicons name="location-outline" size={24} color="black" />
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              {selectedAddress ?(
                <Text>
                   Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) :(
                <Text className="text-sm font-semibold">
                  Add a Address
                </Text>
              )}
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                onPress={() => listHandler(item.name)}
                key={index}
                className=" mx-3 my-2 justify-center items-center"
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={item.image}
                />
                <Text className="items-center text-sm font-semibold mt-2">
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
            pagingEnabled={Platform.select({ android: true })}
          />
          <Text className="p-3 text-lg font-bold">
            Trending Deals of the week
          </Text>
          <View className="flex-row items-center flex-wrap">
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                key={index}
                className="mx-1 my-2 flex-row items-center"
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={ item.image }
                />
              </Pressable>
            ))}
          </View>
          <Text className="h-1 border-gray-200 border-2 mt-4" />
          <Text className="p-3 font-bold text-lg">Today's Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                className="mx-2 my-4 items-center justify-center"
                key={index}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
                <View className="py-2 w-36 justify-center items-center mt-2 rounded-lg bg-red-600">
                  <Text className="items-center color-white font-semibold">
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView >
          <Text className="h-1 border-gray-200 border-2 mt-4" />
          <View className={`mx-2 mt-5 w-90 ${open ? 'mb-12' : 'mb-2'} z-0`}
          >
            <DropDownPicker
            listMode="SCROLLVIEW"
              style={{
                borderColor: "#B1B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <View className="flex-row items-center flex-wrap">
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                  <ProductItem  key={index} item={item} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View className="mb-2">
            <Text className="text-lg font-semibold">Choose your Location</Text>
            <Text className="mt-2 text-base color-gray-400">
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* {already added addresses} */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAddress(item)}
                key={index}
                className={`w-36 h-36 border-gray-300 border-2 p-2 justify-center items-center mt-2 mr-2 ${selectedAddress === item ? 'bg-orange-200' : 'bg-white'}`}
              >
                <View className="flex-row items-center gap-1">
                  <Text className="text-sm font-bold">{item?.name}</Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>
                <Text numberOfLines={1} className="w-34 text-sm items-center">
                  {item?.houseNo},{item?.landmark}
                </Text>
                <Text numberOfLines={1} className="w-34 text-sm items-center">
                  {item?.street}
                </Text>
                <Text numberOfLines={1} className="w-34 text-sm items-center">
                  Poland, Dębica
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              className="w-36 h-36 border-gray-300 border-2 p-2 mt-2 justify-center items-center"
            >
              <Text className="text-center color-teal-500 font-semibold">
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>
          <View className="gap-3">
            <View className="flex-row items-center gap-x-1">
              <Entypo name="location-pin" size={22} color="rgb(20 184 166)" />
              <Text className="color-teal-500 font-semibold">
                Enter an Poland pincode
              </Text>
            </View>
            <View className="flex-row items-center gap-x-1">
              <Ionicons name="locate-sharp" size={22} color="rgb(20 184 166)" />
              <Text className="color-teal-500 font-semibold">
                Use My Current location
              </Text>
            </View>
            <View className="flex-row items-center gap-x-1">
              <AntDesign name="earth" size={22} color="rgb(20 184 166)" />
              <Text className="color-teal-500 font-semibold">
                Deliver outside Poland
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
