import { createSlice } from "@reduxjs/toolkit";

export const FavSlice = createSlice({
  name: "fav",
  initialState:{
    fav:[]
  },
  reducers:{
    addToFav: (state, action) => {
      const favItem = state.fav.find(item => item.id === action.payload.id)
      if(favItem){
        favItem.quantity = 0
      } else{
        state.fav.push({...action.payload, quantity: 1})
      }
    },
    removeFromFav: (state,action) =>{
      const removeFav = state.fav.filter(item => item.id !== action.payload.id)
      state.fav = removeFav
    }
  }
})

export const {addToFav, removeFromFav} = FavSlice.actions

export default FavSlice.reducer