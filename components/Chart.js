import { View, Text,StyleSheet,Image,Dimensions } from 'react-native'
import React from 'react'
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';


export const {width: SIZE} = Dimensions.get('window');




const Chart = ({currentPrice,logoUrl,name,priceChangePercentage7d,sparkline,symbol}) => {
    const pricePercentageColor = priceChangePercentage7d>0 ? 'green' : "red";

    const formatUSD = value =>{
        
        'worklet';
        if (value === ''){
            return `$ ${currentPrice}`;
        }
        const newValue = `$${parseFloat(value).toFixed(2)}`
        
        
        return newValue;
    }
  return (
    
    <ChartPathProvider data={{ points:sparkline, smoothingStrategy: 'bezier' }}>

    <View style={styles.chartWrapper}>

        {/* upper title */}
        <View style={styles.upperTitleWrapper}>
            <View style={styles.upperLeft}>
                <Image source={{uri:logoUrl}} style={styles.image}/>
                <Text style={styles.coinNameAndSymbolandTime}> {name} ({symbol})</Text>
            </View>

            <View style={styles.upperRight}>
                <Text style={styles.coinNameAndSymbolandTime}>7d</Text>    
            </View>
        </View>

        {/* bottom title */}
        <View style={styles.bottomTitleWrapper}>
            
            <ChartYLabel format={formatUSD} style={{fontSize:24,fontWeight:"700"}}/>
            <Text style={[styles.pricePercentageTitle,{color:pricePercentageColor}]}>
            {priceChangePercentage7d}%
            </Text>
        </View>
        <View style={styles.chartLineWrapper}>
        <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
      <ChartDot style={{ backgroundColor: 'black' }} />
      </View>
    </View>

    </ChartPathProvider>
    
    
  )
}
const styles = StyleSheet.create({
    image:{
        height:24,
        width:24,
    },
    upperLeft:{
        flexDirection:'row',
        alignItems:"center",
    },
    upperTitleWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:16,
        alignItems:"center",
        marginTop:16,

    },
    bottomTitleWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:16,
        marginTop:8,
        alignItems:'center'
    },
    coinNameAndSymbolandTime:{
        fontSize:14,
        fontWeight:"400",
        color:"grey",
    },
    priceTitle:{
        fontSize:24,
        fontWeight:"700",
    },
    pricePercentageTitle:{
        fontSize:18,
    },
    chartLineWrapper:{
        marginTop:40,
    }
    
    




});


export default Chart