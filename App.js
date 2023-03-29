import { StyleSheet, Text, View,FlatList, SafeAreaView } from 'react-native';
import ListItem from './components/Listitem';
import { SAMPLE_DATA } from './assets/data/sampleData';

const ListHeader = ()=>(
  <>
  <View style = {styles.titleWrapper}>
      <Text style={styles.largeTitle} >Markets</Text>
      </View>
      <View style={styles.divider} />
  
  </>
)

export default function App() {
  return (
      <View style={styles.container}>
      

      <FlatList 
        key={(item)=> item.id}
        data={SAMPLE_DATA}
        renderItem={({item})=>(
          <ListItem 
          name={item.name} 
          symbol={item.symbol} 
          logoUrl={item.image} 
          currentPrice={item.current_price}
          priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
          />
        )}
        ListHeaderComponent={<ListHeader/>}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeTitle :{
    fontSize : 24,
    fontWeight : "bold"
  },
  titleWrapper :{
    marginTop : 80,
    paddingHorizontal : 16
  },
  divider :{
    height: StyleSheet.hairlineWidth,
    backgroundColor :"#A9ABB1",
    marginHorizontal:16,
    marginTop:16,
  },
  
});
