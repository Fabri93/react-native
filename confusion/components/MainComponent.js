import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent'
import Home from './HomeComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
          headerLeft: <Icon name="menu" size={24} 
          color= 'white'
          onPress={ () => navigation.toggleDrawer() } />          
        })  
    },
    Dishdetail: {screen: DishDetail}
},{
    initialRouteName : 'Menu',
    navigationOptions:{
        headerStyle:{
            backgroundColor:'#ff9933'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  } , {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#ff9933"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff" ,
      headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } />
    })
  });

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({tintColor}) => (
              <Icon
                name="home"
                type='font-awesome'
                size={24}
                color={tintColor}
                />
          )
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({tintColor}) => (
            <Icon
              name="list"
              type='font-awesome'
              size={24}
              color={tintColor}
              />
        )
        }, 
      }
}, {
  drawerBackgroundColor: '#ffcc99'
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
 
  render() {
 
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo
        .Constants.statusBarHeight }}>
             <MainNavigator />
        </View>
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);