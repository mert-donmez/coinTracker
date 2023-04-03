import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useRef, useMemo, useState } from "react";
import ListItem from "./components/ListItem";
import { SAMPLE_DATA } from "../CoinTracker/assets/data/sampleData";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Chart from "./components/Chart";

const Header = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>Markets</Text>
    </View>
    <View style={styles.line} />
  </>
);

const App = () => {
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          key={(item) => item.id}
          data={SAMPLE_DATA}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol.toUpperCase()}
              logoUrl={item.image}
              currentPrice={item.current_price.toLocaleString("us")}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency.toFixed(
                2
              )}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<Header />}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          {
            selectedCoinData ?
          
            <Chart 
            currentPrice={selectedCoinData.current_price.toFixed(2).toLocaleString('us')}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency.toFixed(2)}
            sparkline={selectedCoinData.sparkline_in_7d.price}
            symbol={selectedCoinData.symbol.toUpperCase()}
            
            
            />
           :
          null
          }
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "grey",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor:'black',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
});
