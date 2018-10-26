import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, FlatList, Modal, Button, Share} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
})



function RenderDish(props) {

    const dish = props.dish;
    
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

        if (dish != null) {
            return(
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        
                    }}>
                        <View style={{
                            flex:1,
                            alignItems:'flex-start',
                            margin:10
                        }}>
                    
                            <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                        </View>
                        
                        <View style={{
                            flex:1,
                            alignItems:'flex-start',
                            margin:10
                        }}>
                            <Icon
                            raised
                            reverse
                            name={ 'pencil-square-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.onPressPen()}
                            />
                        </View>
                        <View style={{
                            flex:1,
                            alignItems:'flex-start',
                            margin:10
                        }}>
                        
                            <Icon
                                raised
                                reverse
                                name={'share'}
                                type='font-awesome'
                                color='#51D2A8'
                                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                                />
                        </View>
                        
                    </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                 <Rating
                    imageSize={20}
                    readonly
                    startingValue={item.rating}
                />
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        

       this.state = {
            showModal : false,
            ratingFinale: 3,
            author: '',
            comment:''
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal() {
       this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId) {
        const newLocal = {
            id: 30,
            dishId: dishId,
            rating: this.state.ratingFinale,
            comment: this.state.comment,
            author: this.state.author,
            date: '2012-10-16T17:57:28.556094Z'
        };
        const newComment = newLocal
        this.props.postComment(newComment.dishId, newComment.rating, newComment.comment, newComment.author);
        console.log(newComment.id + ' ' + newComment.rating + ' ' + newComment.comment + ' ' + newComment.author);
        this.setState({
            showModal : false,
            ratingFinale: 3,
            author: '',
            comment:''})

     }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
             <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    onPressPen = {() => this.toggleModal()}
                    />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />                           
       
            <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View>
                    
                        <View style={{
                            alignItems:'center'
                        }}>
                            <Rating
                                showRating
                                type="star"
                                fractions={1}
                                startingValue={3}
                                imageSize={40}
                                onFinishRating={(rating)=>this.setState({ratingFinale:rating})}
                            />
                            <Text>{this.state.ratingFinale}</Text>
                        </View>
                         

                         <TextInput
                            style={{height: 60}}
                            placeholder="Author"
                            onChangeText={(author) => this.setState({author})}
                         />

                          <TextInput
                            style={{height: 60}}
                            placeholder="Comment"
                            onChangeText={(comment) => this.setState({comment})} 
                         />

                        <Text style={{padding: 10, fontSize: 42}}>
                             {this.state.username}
                        </Text>
                        
                        <View style={{height:80,flexDirection: 'column',justifyContent: 'space-between'}}>
                            <View> 
                                <Button
                                    onPress={() => this.handleComment(dishId)}
                                    title="Submit"
                                    color="#512DA8"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                            <View>
                                <Button 
                                    onPress = {() =>{this.toggleModal(); }}
                                    color="#512DA8"
                                    title="Close" 
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

        </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);