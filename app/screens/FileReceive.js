import React, {Component} from 'react';
import TitleBar from '../views/TitleBar.js';
import ListItem from '../views/ListItem';
import ListItemDivider from '../views/ListItemDivider';
import Global from '../utils/Global';
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';
import config from "../config";

const {width} = Dimensions.get('window');

export default class FindScreen extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row1', 'row2', '3', '4', '5']),
      token: ''
    }
  }

  static navigationOptions = {
    tabBarLabel: '工作台',
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('../../images/ic_find_selected.png')}/>
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('../../images/ic_find_normal.png')}/>
      );
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <TitleBar nav={this.props.navigation}/>
        <View style={styles.divider} />
        <ListItem icon={require('../../images/ic_nearby.png')} text={"收文"} handleClick={() => this.getReceive()} />
        <Text>收文管理</Text>
        <View style={{width: width, height: 20}}/>
        <View style={styles.divider} />
        <ListView style={{marginTop: 20}}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    return (
      <View>
        <Text>{rowData}</Text>
      </View>
    );
  }
  getReceive() {
    let url = `${config.http.apiPrefix}/login`;
    let listUrl = `${config.http.apiPrefix}/oaManagement/receiveDocument/dto/todo`;
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: '',
    };
    const token = this.state.token;
    let postData = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username: 'iadmin',
        password: '123456',
      }),
    };
    let postDataReceive = {
      method: 'GET',
      headers: headers,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    // this.setState({showProgress: true});
    // jwt
    fetch(url, postData)
      .then((res) => res.json())
      .then((info) => {
        // this.setState({showProgress: false});
        console.log(info);
        // 检验服务端返回状态
        if (info.status === config.http.status.success) {
          console.log('In');
          // todo 储存用户令牌
          this.setState({ token:info.data.token });
          headers.Authorization = `Bearer ${this.state.token}`;
          fetch(listUrl, postDataReceive)
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
            })
        } else {
          console.log('out');
          console.log(info.data.code+info.data.description);
          // Toast.show(`登录失败  ${info.data.code}  ${info.data.description}`);
        }
      }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#D3D3D3'
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    backgroundColor: Global.pageBackgroundColor
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
});
