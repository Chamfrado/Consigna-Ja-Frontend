
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

export const Container = (props) => {

    const insets = useSafeAreaInsets();
  
    return (
      <SafeAreaProvider style={{ flex: 1 , paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
        {props.children}
      </SafeAreaProvider>
    );
  };