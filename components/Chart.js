import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native'
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';

const { width: SIZE } = Dimensions.get('window');


const Chart = ({ currentPrice, logoUrl, name, symbol, priceChangePercentage7d, sparkline,high_24h,low_24h,price_change_percentage_24h,ath,atl,ath_change_percentage }) => {
  const latestCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);

  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30';
  const h24_priceChangeColor = price_change_percentage_24h > 0 ? '#34C759' : '#FF3B30';
  const ath_change = ath_change_percentage > 0 ? '#34C759' : '#FF3B30';
  

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;

    setTimeout(() => {
      setChartReady(true);
    }, 0)

  }, [currentPrice])

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      const formattedValue = `$${latestCurrentPrice.value.toLocaleString('en-US', { currency: 'USD' })}`
      return formattedValue;
    }

    const formattedValue =`$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    return formattedValue;
  };

  if (sparkline.length === 0) {
    return <Text>Loading...</Text>
  }

  return (
    <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
      <View style={styles.chartWrapper}>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
            </View>
            <Text style={styles.subtitle}>7d</Text>
          </View>
          <View style={styles.lowerTitles}>
            <ChartYLabel
              format={formatUSD}
              style={styles.boldTitle}
            />
            <Text style={[styles.title, {color: priceChangeColor}]}>{priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>

        { chartReady ?
        (<View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 3} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'black' }} />
          </View>)

          :

          null
        
        }
        <View style={styles.modalInfoMainWrapper}>
            <View style={styles.modalInfoLeftSide}>
                <View style={styles.leftSideTitles}>
                <Text style={styles.modalInfoLeftText}>24h High: </Text>
                <Text style={styles.modalInfoLeftTextStat}> ${high_24h}</Text>
                </View>
                
                <View style={styles.leftSideTitles}>
                <Text style={styles.modalInfoLeftText}>24h Low: </Text>
                <Text style={styles.modalInfoLeftTextStat}> ${low_24h}</Text>
                </View>
                <View style={styles.leftSideTitles}>
               
                <Text style={styles.modalInfoLeftText}>24h Change: </Text>
                <Text style={[styles.modalInfoLeftTextStat,{color:h24_priceChangeColor}]}> {price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>

            <View style={styles.modalInfoRightSide}>
                <View style={styles.rightSideTitles}>
                <Text style={styles.modalInfoRightTextStat}>${ath}</Text>
                <Text style={styles.modalInfoRightText}> :All-Time High</Text>
                </View>
                
                <View style={styles.rightSideTitles}>
                <Text style={styles.modalInfoRightTextStat}>${atl.toFixed(5)}</Text>
                <Text style={styles.modalInfoRightText}> :All-Time Low</Text>
                </View>
                <View style={styles.rightSideTitles}>
               
                <Text style={[styles.modalInfoRightTextStat,{color:ath_change}]}>{ath_change_percentage.toFixed(2)}%</Text>
                <Text style={[styles.modalInfoRightText]}> :From ATH</Text>
                </View>
            </View>
            
        </View>
        
      </View>
    </ChartPathProvider>
  )
}

const styles = StyleSheet.create({
    
  chartWrapper: {
    marginVertical: 16
  },
  titlesWrapper: {
    marginHorizontal: 16
  },
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#A9ABB1',
  },
  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
  modalInfoMainWrapper:{
   flexDirection:"row",
   justifyContent:"space-between",
   marginTop:16,
   marginHorizontal:8,
  },
  leftSideTitles:{
    flexDirection:"row",
    marginTop:8,
  },
  rightSideTitles:{
    flexDirection:"row",
    marginTop:8,
  },
  modalInfoLeftText:{
    fontWeight:"400"
  },
  modalInfoRightText:{
    fontWeight:"400",
  },
  modalInfoRightTextStat:{
    fontWeight:'200',
  },
  modalInfoLeftTextStat:{
    fontWeight:'200',
  },
  modalInfoRightSide:{
    alignItems:'flex-end',
  }
  
 

});

export default Chart