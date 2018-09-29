import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    };



    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {

            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        avatar={ require('./images/intesa.jpg')}
                    />
            );
        };
        

        return (
            <FlatList 
                data={this.state.dishes}
                keyExtractor={item => item.id.toString()}
                renderItem={renderMenuItem}
                />
        );

    }
    
}


export default Menu;