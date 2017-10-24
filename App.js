import React from 'react';
import { StyleSheet, Text, View, TabBarIOS, NavigatorIOS, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'tabFavorites'};
  }
  setTab(tabId) {
    this.setState({selectedTab: tabId});
  }
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item 
          systemIcon="favorites"
          selected={this.state.selectedTab === 'tabFavorites'}
          onPress={() => this.setTab('tabFavorites')}>
          <NavigatorIOS
            initialRoute={{
              component: MyScene,
              title: 'My Initial Scene',
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item 
          systemIcon="downloads"
          selected={this.state.selectedTab === 'tabDownloads'}
          onPress={() => this.setTab('tabDownloads')}>
          <View>
            <Text>Hello second tab</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

class MyScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: '#ff00ff'};
  }
  navigateToNext() {
    this.props.navigator.push({
        component: MyScene,
        title: 'Test2',
    });
  }
  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.color}]} >
        <Button title={"Click here"} onPress={() => this.navigateToNext()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
