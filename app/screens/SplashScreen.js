import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';


import {
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
  } from 'react-native';
  
  // flexbox
  const {width, height} = Dimensions.get('window');

  export default class SplashScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fadeAnim: new Animated.Value(0),
        hasLogin: false
      };
      
    }

    render() {
      return (
        <View>
          <StatusBar backgroundColor="#000000"/>
          <Image source={require("../../images/splash.jpg")} style={{width: width, height: height}}/>
          {
            this.state.hasLogin ? (null) :(
                <View  style={styles.buttonContainer}>
                <TouchableOpacity style={{flex: 1}} activeOpacity={0.6}  onPress={() => {
                this.props.navigation.navigate('Login')
              }}>
                  <View style={[styles.btnLogin, styles.btnColumn]}>
                    <Text style={styles.button}>登录</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}} activeOpacity={0.6} >
                  <View style={[styles.btnRegister, styles.btnColumn]}>
                    <Text style={styles.button}>退出</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      );
    }
  
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      bottom: 50,
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 20,
      paddingRight: 20,
    },
    btnColumn: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
    },
    button: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 16,
    },
    btnLogin: {
      backgroundColor: '#FFFFFF',
      marginRight: 15,
    },
    btnRegister: {
      backgroundColor: '#00BC0C',
      marginLeft: 15,
    }
  });
  