import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
const width = Dimensions.get('window').width * .85;

const SliderText = (props) => {
  const multiplier = props.multiplier || 1.15;
  const maximumValue = props.maximumValue || 1;
  const stepValue = props.stepValue || 1;
  const value = props.value || 0;
  const logic = maximumValue * multiplier;
  const [sliderValue, setSliderValue] = useState(props.sliderValue || 0);

  const left = sliderValue >= 100000000 ? sliderValue * width / logic - 40 : sliderValue * width / logic;
  console.log("SLIDER VALAUE :::", props.sliderValue,left)

  const sendSliderValue = (slider) => {
    setSliderValue(slider);
    props.onValueChange(slider);
  };

  return (
    <View style={[styles.slider, props.containerStyle]}>
      <View
        style={{
          transform: [props.isRTL ?{ translateX: -left } : { translateX: left }]
        }}
      >
        {props.renderCustomLabel !== undefined ? props.renderCustomLabel() :
          <Text style={[styles.text, props.customCountStyle]}>{Math.floor(sliderValue)}</Text>}
      </View>
      <Slider
        style={[styles.slider, props.sliderStyle,props.isRTL ?{transform :[{rotateY : "180deg"}]}:{}]}
        minimumValue={props.minimumValue || 0}
        maximumValue={maximumValue}
        step={stepValue}
        minimumTrackTintColor={props.minimumTrackTintColor || '#000'}
        thumbTintColor={props.thumbTintColor || '#000'}
        maximumTrackTintColor={props.maximumTrackTintColor || '#999'}
        onValueChange={(e) => sendSliderValue(e)}
        onSlidingComplete={props.onSlidingComplete}
        value={value}
          
      />
      <View style={styles.row}>
        <Text style={[styles.customLabel, props.customLabelStyle]}>{props.minimumValueLabel || ''}</Text>
        <Text style={[styles.customLabel, props.customLabelStyle]}>{props.maximumValueLabel || ''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  slider: {
    width: width - 20,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom:-10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  customLabel: {
    fontSize: 20
  }
});

export default SliderText;
