import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import Square from './Square';
import _ from 'lodash';

import { Button } from 'react-native-elements';

export default class Board extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            squares: Array.apply(null, {length: Math.pow(props.size, 2)}).map((v, i) => i + 1),
            started: false
        };
    }

    solve(){
        // stop game if started
        if(this.state.started){
            this.setState({
                started: false,
                squares: Array.apply(null, {length: Math.pow(this.props.size, 2)}).map((v, i) => i + 1)
            })
            return;
        }
    }

    shuffle(){
        let squares = this.state.squares;

        this.setState({
            started: true
        })

        let possibleMoves, emptyIndex, oldIndex;

        for(let i = 0; i < 1000; i ++){
            possibleMoves = []
            emptyIndex = _.indexOf(squares, 16);
            const chunks = _.chunk(squares, 4);

            const lineIndex = Math.floor(emptyIndex / 4); // line index

            // checks if left block exists
            if(_.indexOf(chunks[lineIndex], 16) !== 0){
                possibleMoves.push(emptyIndex - 1);
            }

            // checks if right block exists
            if(_.indexOf(chunks[lineIndex], 16) !== 3){
                possibleMoves.push(emptyIndex + 1);
            }

            // checks if top block exists
            if(chunks[lineIndex - 1]){
                possibleMoves.push(emptyIndex - 4);
            }

            // checks if bottom block exists
            if(chunks[lineIndex + 1]){
                possibleMoves.push(emptyIndex + 4);
            }

            // Removes old moves to make it more difficult
            possibleMoves = _.without(possibleMoves, oldIndex);

            // Random pick
            const pickedIndex = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];

            squares = _.map(squares, (v, i) => {
                if(i === pickedIndex){
                    return 16;
                }
                if(i === emptyIndex){
                    return squares[pickedIndex];
                }
    
                return v;
            })
            oldIndex = emptyIndex;
        }

        this.setState({
            squares: squares
        })

    }

    onSwitchHandler(key){
        const keyIndex = _.indexOf(this.state.squares, key);
        const emptyIndex = _.indexOf(this.state.squares, 16);

        // checking if key is movable
        if(!_.includes([keyIndex - 1, keyIndex + 1, keyIndex - 4, keyIndex + 4], emptyIndex)){
            return;
        }

        let squares = this.state.squares;

        squares = _.map(squares, (v, i) => {
            if(i === keyIndex){
                return 16;
            }
            if(i === emptyIndex){
                return key;
            }

            return v;
        })

        this.setState({
            squares: squares
        })

        // checks if you won
        if(_.size(_.filter(squares, (v,i) => v === i + 1)) === 16){
            this.setState({
                started:false
            })
        }
    }

    render(){
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={styles.header}>15 Puzzle</Text>
                <View style={styles.board}>
                    {this.state.squares.map((v, i) => <Square position={[Math.floor(i / this.props.size), i % this.props.size]} onSwitch={(key) => this.onSwitchHandler(key)} key={i} value={v} />)}
                </View>
                <View style={{
                    width: 300,
                    height: 40,
                    marginTop: 30,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <Button onPress={this.solve.bind(this)} titleStyle={{fontSize: 24}} buttonStyle={{height: 48, width: 120}} title="Solve" />
                    <Button onPress={this.shuffle.bind(this)} titleStyle={{fontSize: 24}} buttonStyle={{height: 48, width: 120, backgroundColor: '#CD7C25'}} title="Shuffle" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      fontSize: 44,
      textAlign: 'center',
      color: '#1F0B3D',
      marginBottom: 20
    },
    board: {
        borderWidth: 2,
        borderColor: '#d6d7da',
        position: 'relative',
        width: 302,
        height: 302,
    }
  });