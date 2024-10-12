import { Dimensions } from "react-native";

const GetScreenWidth = () => {
  return Math.round(Dimensions.get('window').width);
}

const GetScreenHeight = () => {
  return Math.round(Dimensions.get('window').height);
}

export {
  GetScreenWidth,
  GetScreenHeight
};