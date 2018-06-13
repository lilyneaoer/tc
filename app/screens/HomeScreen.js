import React, { Component } from 'react';
import CountEmitter from '../event/CountEmitter';
import Global from "../utils/Global";
import TitleBar from "../views/TitleBar";
import UpgradeDialog from "../views/UpgradeDialog";
import StorageUtil from "../utils/StorageUtil";
import {
    Image ,
    StatusBar,
    View,
    StyleSheet,
    Dimensions,
    PixelRatio,
    Text
} from "react-native";

const {width,height}=Dimensions.get('window'); 

export default class HomeScreen extends Component {
    static navigationOptions = {
      tabBarLabel: '信息',
      tabBarIcon: ({focused, tintColor}) => {
        if (focused) {
          return (
            <Image style={styles.tabBarIcon} source={require('../../images/ic_weixin_selected.png')}/>
          );
        }
        return (
          <Image style={styles.tabBarIcon} source={require('../../images/ic_weixin_normal.png')}/>
        );
      },
    };
  
    constructor(props) {
      super(props);
      this.state = {
        checkedUpgrade: true, // 标记是否检查了更新，这里置为true则不会检查更新，设置为false则每次启动时检查更新，该功能默认不开启
        recentConversation: []
      };
      //this.registerHXListener();
    }
  
    loadConversations(username) {
      ConversationUtil.getConversations(username, (result) => {
        let count = result.length;
        if (count == 0) {
          // 没有会话，创建两个会话
          this.generateAutoConversation('tulingrobot');
          return;
        }
        let index = 0;
        for (let i = 0; i < count; i++) {
          let conversation = result[i];
          let chatWithUsername = conversation.conversationId.replace(username, '');
          UserInfoUtil.getUserInfo(chatWithUsername, (userInfo) => {
            index++;
            if (userInfo != null) {
              conversation['avatar'] = userInfo.avatar;
              conversation['nick'] = userInfo.nick;
            }
            if (index == count) {
              this.setState({recentConversation: result});
              ConversationUtil.showConversations();
            }
          });
        }
      });
    }
  
    // 生成自动回复的对话
    generateAutoConversation(chatUsername) {
      let id = WebIM.conn.getUniqueId();           // 生成本地消息id
      let msg = new WebIM.message('txt', id);      // 创建文本消息
      let message = '你好，我是RNWeChat作者，欢迎使用RNWeChat，有任何问题都可以与我交流！';
      if (chatUsername == 'tulingrobot') {
        message = '我是图灵机器人，开心或者不开心，都可以找我聊天~';
      }
      msg.set({
        msg: message,                  // 消息内容
        to: this.state.username,        // 接收消息对象（用户id）
        roomType: false,
        success: function (id, serverMsgId) {
        },
        fail: function (e) {
        }
      });
      msg.body.chatType = 'singleChat';
      ConversationUtil.addMessage({
        'conversationId': ConversationUtil.generateConversationId(chatUsername, this.state.username),
        'id': id,
        'from': chatUsername,
        'to': this.state.username,
        'time': TimeUtil.currentTime(),
        'data': message,
        'msgType': 'txt'
      }, ()=>{
        if (chatUsername == 'tulingrobot' && this.state.username != 'yubo666') {
          this.generateAutoConversation('yubo666');
        } else {
          this.loadConversations(this.state.username);
        }
      });
    }
  
    registerHXListener() {  // 注册环信的消息监听器
      /*
      WebIM.conn.listen({
        // xmpp连接成功
        onOpened: (msg) => {
          Toast.showShortCenter('onOpend')
          // 登录环信服务器成功后回调这里
          // 出席后才能接受推送消息
          WebIM.conn.setPresence();
        },
        // 出席消息
        onPresence: (msg) => {
        },
        // 各种异常
        onError: (error) => {
          Toast.showShortCenter('登录聊天服务器出错');
          console.log('onError: ' + JSON.stringify(error));
        },
        // 连接断开
        onClosed: (msg) => {
          Toast.showShortCenter('与聊天服务器连接断开');
        },
        // 更新黑名单
        onBlacklistUpdate: (list) => {
        },
        // 文本消息
        onTextMessage: (message) => {
          message.conversationId = ConversationUtil.generateConversationId(message.from, message.to);
          message.msgType = 'txt';
          message.time = TimeUtil.currentTime();
          ConversationUtil.addMessage(message, (error) => {
            // 重新加载会话
            this.loadConversations(this.state.username);
            // 若当前在聊天界面，还要通知聊天界面刷新
            CountEmitter.emit('notifyChattingRefresh');
          });
        },
        onPictureMessage: (message) => {
          message.conversationId = ConversationUtil.generateConversationId(message.from, message.to);
          message.msgType = 'img';
          message.time = TimeUtil.currentTime();
          ConversationUtil.addMessage(message, (error) => {
            // 重新加载会话
            this.loadConversations(this.state.username);
            // 若当前在聊天界面，还要通知聊天界面刷新
            CountEmitter.emit('notifyChattingRefresh');
          });
        }
      });

      */
    }
  
    componentWillMount() {
      CountEmitter.addListener('notifyConversationListRefresh', () => {
        // 重新加载会话
        this.loadConversations(this.state.username);
      });
    }
  
    render() {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor='#393A3E'
            barStyle="light-content"
          />
          <TitleBar nav={this.props.navigation}/>
          <View style={styles.divider}></View>
          <View style={styles.content}>
            {
              this.state.recentConversation.length == 0 ? (
                <Text style={styles.emptyHintText}>暂无会话消息</Text>
              ) : (
                <FlatList
                  data={this.state.recentConversation}
                  renderItem={this.renderItem}
                  keyExtractor={this._keyExtractor}
                />
              )
            }
          </View>
          <View style={styles.divider}></View>
          <View style={{backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, width: width}}>
            <UpgradeDialog ref="upgradeDialog" content={this.state.upgradeContent}/>
          </View>
        </View>
      );
    }
  
    unregisterListeners() {
      CountEmitter.removeListener('notifyConversationListRefresh', ()=>{});
    }
  
    _keyExtractor = (item, index) => item.conversationId
  
    componentDidMount() {
      StorageUtil.get('username', (error, object) => {
        if (!error && object && object.username) {
          this.setState({username: object.username});
          this.loadConversations(object.username);
        }
      });
      // 组件挂载完成后检查是否有更新，只针对Android平台检查
      if (!this.state.checkedUpgrade) {
        if (Platform.OS === 'android') {
          UpgradeModule.getVersionCodeName((versionCode, versionName) => {
            if (versionCode > 0 && !Utils.isEmpty(versionName)) {
              // 请求服务器查询更新
              let url = 'http://app.yubo725.top/upgrade?versionCode=' + versionCode + '&versionName=' + versionName;
              fetch(url).then((res) => res.json())
                .then((json) => {
                  if (json != null && json.code == 1) {
                    // 有新版本
                    let data = json.msg;
                    if (data != null) {
                      let newVersionCode = data.versionCode;
                      let newVersionName = data.versionName;
                      let newVersionDesc = data.versionDesc;
                      let downUrl = data.downUrl;
                      let content = "版本号：" + newVersionCode + "\n\n版本名称：" + newVersionName + "\n\n更新说明：" + newVersionDesc;
                      this.setState({upgradeContent: content}, () => {
                        // 显示更新dialog
                        this.refs.upgradeDialog.showModal();
                      });
                    }
                  }
                }).catch((e) => {
              })
            }
          })
        }
        this.setState({checkedUpgrade: true});
      }
    }
  
    componentWillUnmount() {
      this.unregisterListeners();
    }
  
    renderItem = (data) => {
      let lastTime = data.item.lastTime;
      let lastMsg = data.item.messages[data.item.messages.length - 1];
      let contactId = lastMsg.from;
      if (contactId == this.state.username) {
        contactId = lastMsg.to;
      }
      let nick = data.item.nick;
      if (Utils.isEmpty(nick)) {
        nick = contactId;
      }
      let lastMsgContent = '';
      if (lastMsg.msgType == 'txt') {
        lastMsgContent = lastMsg.data;
      } else if (lastMsg.msgType == 'img') {
        lastMsgContent = '[图片]';
      }
      let avatar = require('../../images/ic_list_icon.png');
      if (data.item.avatar != null) {
        avatar = {uri: data.item.avatar};
      }
      return (
        <View>
          <TouchableHighlight underlayColor={Global.touchableHighlightColor}
                              onPress={() => {
                                this.props.navigation.navigate('Chatting', {
                                  'contactId': contactId,
                                  'name': nick,
                                  'avatar': avatar
                                })
                              }}>
            <View style={styles.listItemContainer}>
              <Image source={avatar} style={{width: 50, height: 50}}/>
              <View style={styles.listItemTextContainer}>
                <View style={styles.listItemSubContainer}>
                  <Text numberOfLines={1} style={styles.listItemTitle}>{nick}</Text>
                  <Text numberOfLines={1} style={styles.listItemTime}>{TimeUtil.formatChatTime(lastTime)}</Text>
                </View>
                <View style={styles.listItemSubContainer}>
                  <Text numberOfLines={1} style={styles.listItemSubtitle}>{lastMsgContent}</Text>
                  {
                    data.item.unreadCount > 0 ? (
                      <View style={styles.redDot}>
                        <Text style={styles.redDotText}>{data.item.unreadCount}</Text>
                      </View>
                    ) : ( null )
                  }
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.divider}/>
        </View>
      );
    }
  }
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: Global.dividerColor
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Global.pageBackgroundColor
  },
  listItemContainer: {
    flexDirection: 'row',
    width: width,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  listItemTextContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 15,
  },
  listItemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTitle: {
    color: '#333333',
    fontSize: 16,
    flex: 1,
  },
  listItemTime: {
    color: '#999999',
    fontSize: 12,
  },
  listItemSubtitle: {
    color: '#999999',
    fontSize: 14,
    marginTop: 3,
    flex: 1,
  },
  redDot: {
    borderRadius: 90,
    width: 18,
    height: 18,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  redDotText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  emptyHintText: {
    fontSize: 18,
    color: '#999999'
  }
});