import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    MapView,
    StyleSheet
} from 'react-native';

var Api = require('./src/api.js');


class Weather extends Component{
    constructor() {
        super();
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        this.state = {
          pin:{
              latitude:0,
              longitude:0
          },
          city: '',
          tempreture: '',
          description: ''
        };
    }
    render(){
            console.log(this.state);
        return(
            <View style={styles.container}>
                <MapView
                annotations={[this.state.pin]}
                style={styles.map}
                onRegionChangeComplete = {this.onRegionChangeComplete}>
                </MapView>
                <View style={styles.textWapper}>
                    <Text style={styles.text}>{this.state.city}</Text>
                    <Text style={styles.text}>{this.state.tempreture}</Text>
                    <Text style={styles.text}>{this.state.description}</Text>
                </View>
            </View>





        )
    }
    onRegionChangeComplete(region){
        this.setState({
            pin:{
                latitude: region.latitude,
                longitude: region.longitude
            }
        });
        Api(region.latitude, region.longitude).then((data) => {
            this.setState({city: data.city,
                            tempreture: data.tempreture,
                            description: data.description
                        });
        });
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    map:{
        flex:2
    },
    textWapper:{

        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize: 30
    }
});

AppRegistry.registerComponent('weather', () => Weather);
