import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class Square extends React.Component{
    getStyles(){
        return {
            top: this.props.position[0] * 70 + 3 + 4 * this.props.position[0],
            left: this.props.position[1] * 70 + 3+ 4 * this.props.position[1]
        }
    }

    render(){
        return (
            <TouchableOpacity activeOpacity={0.8} style={[styles.button, (this.props.value === 16 ? {} : styles.buttonFilled), this.getStyles()]}
                onPress={this.props.onSwitch.bind(null, this.props.value)}
            >
                <Text style={styles.buttonText}>{this.props.value}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        left: 0,
        top: 0,
        position: 'absolute',
        width: 70,
        height: 70
    },
    buttonFilled: {
        backgroundColor: '#D39F17',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 40,
        textAlign: 'center',
        color: '#fff',
        lineHeight: 70
    }
  });