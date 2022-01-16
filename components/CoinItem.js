import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CoinItem = ({ coin }) => {
    return (
        <View style={styles.containerItem}>
            <View style={styles.wrapperItem}>
            <Image 
                style={styles.image}
                source={{ uri: coin.image }}
            />
            <View style={styles.containerName}>
                <Text style={styles.text}>{coin.name}</Text>
                <Text style={styles.textSymbol}>{coin.symbol}</Text>
            </View>
            </View>
            <View>
                <Text style={styles.text}>${coin.current_price}</Text>
                <Text 
                    style={[
                        styles.pricePorcentage,
                        coin.price_change_percentage_24h < 0 
                            ? styles.priceDown
                            : styles.priceUp,
                    ]}>
                    {coin.price_change_percentage_24h}
                </Text>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem:{
        flexDirection: 'row',
        backgroundColor: '#131313',
        paddingTop: 10,
        justifyContent: 'space-between',
    },
    wrapperItem:{
        flexDirection: 'row',
    },
    image:{
        width: 60,
        height: 60,
    },
    text:{
        color: '#f1f1f1',
        fontSize:25,
        textAlign: 'right',
      },
      textSymbol:{
        color: '#338',
        fontSize:15,
        textTransform: 'uppercase',
      },
      containerName:{
        marginLeft: 10,
      },
      pricePorcentage:{
        textAlign: 'right',
        fontSize:15,
      },
      priceUp:{
          color: '#2f1'
      },
      priceDown:{
        color: '#ff0000'
    }
})

export default CoinItem
