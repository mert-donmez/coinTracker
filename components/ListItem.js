import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'

const ListItem = ({name,symbol,currentPrice,priceChangePercentage7d,logoUrl,onPress}) => {
    const pricePercentageColor = priceChangePercentage7d>0 ? 'green' : "red";
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
        
      {/* left side */}
      <View style={styles.leftWrapper} > 
        <Image source={{uri: logoUrl}} style = {styles.image} />
        <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style = { styles.subTitle}>{(symbol)}</Text>
        </View>
      </View>

      {/* right side */}
        <View style={styles.rightWrapper}>
            <Text style={styles.title}>${currentPrice}</Text>
            <Text style= {[styles.subTitle , {color:pricePercentageColor}]}>{priceChangePercentage7d}%</Text>
        </View>
        

    </TouchableOpacity>
  )
}

export default ListItem

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingTop: 24,
        marginHorizontal : 16,
        alignItems : "center",
    },
    image:{
        height:48,
        width:48,
    },
    leftWrapper :{
        flexDirection : 'row',
        alignItems : "center",
    },
    title :{
        fontSize:18,
        fontWeight: "400",
    },
    titleWrapper : {
        marginLeft:8,
    },
    subTitle :{
        fontSize : 14,
        color : "#A9ABB1",
    },
    rightWrapper:{
        alignItems : 'flex-end',
    }
    

    
    

})