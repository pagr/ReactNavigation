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
        component: WeatherView,
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

class WeatherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Loading'};
  }
  async componentDidMount() {
    try {
      var url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.017578/lat/59.243414/data.json"
      var data = await fetch(url)
      var json = await data.json()
      this.setState({ text: json.approvedTime, });
    } catch(error) {
      throw error
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
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
