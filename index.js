import React from "react";
import {Text, TextInput, View} from 'react-native';
import {MethodService} from 'Services/MethodService';
import STYLES from "../Login/styles";

let allowFontScaling, onChangeText, placeholder, placeholderStyle, placeholderTextColor, onRef, value, style, inputProps;

class CustomTextInput extends React.Component {

    _onChangeText(text) {
        if (text.length > 0) {
            this.setState({showPlaceholer: false});
        } else {
            this.setState({showPlaceholer: true});
        }
        if (this.onChangeText && typeof this.onChangeText === 'function') {
            this.onChangeText(text);
        }
    };

    constructor(props) {
        super(props);

        ({allowFontScaling, onChangeText, placeholder, placeholderStyle, placeholderTextColor, onRef, value, style, ...inputProps} = this.props);

        this._onChangeText = this._onChangeText.bind(this);

        this.allowFontScaling = allowFontScaling;
        this.onChangeText = onChangeText;
        this.placeholder = placeholder;
        this.placeholderStyle = placeholderStyle;
        this.placeholderTextColor = placeholderTextColor;
        this.onRef = onRef;
        this.style = style;
        this.inputProps = inputProps;
        this.input = {};

        this.state = {
            showPlaceholer: true,
            isFirstInit: true
        };
    };

    clear() {
        this.setState({showPlaceholer: true});
        this.input.setNativeProps({
            text: ''
        });
    };

    render() {
        return (
            <View
                style={[
                    this.style && this.style.backgroundColor ? this.style.backgroundColor : null,
                    {flex: 1}
                ]}

            >
                {
                    this.placeholder && this.placeholder.length > 0 ?
                        <Text style={[
                            {position: 'absolute'},
                            {flex: 1},
                            {fontSize: this.placeholderStyle && this.placeholderStyle.fontSize ? this.placeholderStyle.fontSize : 16},
                            {color: this.placeholderStyle && this.placeholderStyle.color ? this.placeholderStyle.color : '#ccc'},
                            this.placeholderStyle ? {...this.placeholderStyle} : null,
                            {opacity: this.state.showPlaceholer ? 1 : 0}
                        ]}
                              allowFontScaling={this.allowFontScaling !== null ? this.allowFontScaling : null}
                        >
                            {this.placeholder}
                        </Text> :
                        null
                }
                <TextInput
                    {...this.inputProps}
                    allowFontScaling={this.allowFontScaling !== null ? this.allowFontScaling : null}
                    ref={input => {
                        if (input) {
                            this.input = input;

                            if (this.state.isFirstInit) {
                                this.input.setNativeProps({
                                    text: value
                                });
                                this.setState({isFirstInit: false})
                            }

                            if (this.onRef && typeof this.onRef === 'function') {
                                this.onRef(this.input);
                                this.input.clear = this.clear.bind(this);
                            }
                        }
                    }}
                    style={[{flex: 1}, {backgroundColor: 'rgba(255,255,255,0)'}, this.style]}
                    onChangeText={this._onChangeText}
                    placeholder={null}
                    placeholderTextColor={null}
                 />
            </View>
        );
    }
};

export default CustomTextInput;