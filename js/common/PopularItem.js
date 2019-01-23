import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends Component{
  render() {
    const {item} = this.props
    if(!item || !item.owner) {
      return null
    }
    let favorateButton =
      <TouchableOpacity
        style={{padding: 6}}
        onPress={() => {
        }}
        underlayColor={'transparent'}
      >
        <FontAwesome
          name={'star-o'}
          size={26}
          style={{color: 'red'}}
        />
      </TouchableOpacity>;
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
      >
        <View style={styles.cell_container}>
          <Text>
            {item.full_name}
          </Text>
          <Text>
            {item.description}
          </Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Author</Text>
              <Image
                style={{height: 22, width: 22}}
                source={{uri:item.owner.avatar_url}}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Star:</Text>
              <Text>{item.stargazers_count}</Text>
            </View>
            {favorateButton}
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 3,
    borderColor: '#333',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,  // ios设置阴影有效
    elevation: 2   // Android设置阴影有效
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
