import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import Toast from 'react-native-root-toast';
import StorageUtil from '../utils/StorageUtil';
import Utils from '../utils/Utils';
import CommonTitleBar from '../views/CommonTitleBar';

import {
    Dimensions, 
    Image,
    StyleSheet,
    Text, 
    TextInput, 
    TouchableOpacity, 
    View
} from 'react-native';



const {width} = Dimensions.get('window');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername: '',
      username: '',
      password: '',
      showProgress: false,
      avatar: ''
    };
    StorageUtil.get('username', (error, object) => {
      if (!error && object && object.username) {
        this.setState({username: object.username});
        StorageUtil.get('userInfo-' + object.username, (error, object) => {
          if (!error && object && object.info) {
            let userInfo = object.info;
            if (userInfo && userInfo.avatar) {
              this.setState({avatar: userInfo.avatar});
            }
          }
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar nav={this.props.navigation} title={"登录"}/>
        <View style={styles.content}>
          {
            Utils.isEmpty(this.state.username) ? (
              <View style={styles.pwdView}>
                <Image source={require('../../images/ic_launcher.png')}
                       style={{width: 100, height: 100, marginBottom: 50}}/>
                <View style={styles.pwdContainer}>
                  <Text style={{fontSize: 16}}>用户名：</Text>
                  <TextInput onChangeText={(text) => {
                    this.setState({inputUsername: text})
                  }} style={styles.textInput} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.pwdDivider}></View>
              </View>
            ) : (
              <View>
                <Image
                  source={Utils.isEmpty(this.state.avatar) ? require('../../images/avatar.png') : {uri: this.state.avatar}}
                  style={{width: 100, height: 100, marginTop: 100}}/>
                <Text style={styles.usernameText}>{this.state.username}</Text>
              </View>
            )
          }
          {
            this.state.showProgress ? (
              <LoadingView cancel={() => this.setState({showProgress: false})}/>
            ) : (null)
          }
          <View style={styles.pwdView}>
            <View style={styles.pwdContainer}>
              <Text style={{fontSize: 16}}>密码：</Text>
              <TextInput secureTextEntry={true} onChangeText={(text) => {
                this.setState({password: text})
              }} style={styles.textInput} underlineColorAndroid="transparent"/>
            </View>
            <View style={styles.pwdDivider}></View>
            <TouchableOpacity activeOpacity={0.6} onPress={() => this.login()}>
              <View style={styles.loginBtn}>
                <Text style={{color: '#FFFFFF', fontSize: 16}}>登录</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {
          Utils.isEmpty(this.state.username) ? null : (
            <TouchableOpacity onPress={() => {
              this.changeAccount()
            }}>
              <Text style={styles.changeAccount}>切换账号</Text>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }

  login() {
        // fetch login api
        Toast.show('登录成功');
        StorageUtil.set('hasLogin', {'hasLogin': true});
        StorageUtil.set('username', {'username': this.state.username});
        StorageUtil.set('password', {'password': this.state.password});
        this.props.navigation.navigate('Home');
        /*
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'})
          ],
          key:null
        });
        

        */
  }

}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    pwdView: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 50,
    },
    textInput: {
      flex: 1
    },
    usernameText: {
      marginTop: 10,
      fontSize: 16,
      textAlign: 'center'
    },
    pwdContainer: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      marginLeft: 40,
      marginRight: 40,
    },
    pwdDivider: {
      width: width - 60,
      marginLeft: 30,
      marginRight: 30,
      height: 1,
      backgroundColor: '#00BC0C'
    },
    loginBtn: {
      width: width - 40,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 50,
      height: 50,
      borderRadius: 3,
      backgroundColor: '#00BC0C',
      justifyContent: 'center',
      alignItems: 'center',
    },
    changeAccount: {
      fontSize: 16,
      color: '#00BC0C',
      textAlign: 'center',
      marginBottom: 20
    }
  });