import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import BasePage from '../pages/base/base';
import { Flex, Button } from '@ant-design/react-native';  
import UDToast from '../utils/UDToast';
import api from '../utils/api';

//验证手机号码
export default class CheckMobile extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            no: ''
        };
    }

    // componentDidMount() {
    //     api.getData('/api/MobileMethod/GetDataItemTreeJson', { code: 'ReductionType' }).then(res => {
    //         if (res.length > 0) {
    //             this.setState({
    //                 types: [...res.map(item => item.title)],
    //                 reductionType: res[0].title
    //             }, () => {
    //                 //console.log(this.state.dataInfo.data);
    //             });
    //         }
    //     });
    // }

    in = () => {
        const { no } = this.state;
        const { unitId } = this.props;
        if (!no) {
            UDToast.showError('请输入4位手机尾号');
            return;
        }

        let params = {
            unitId: unitId,
            no: no
        };
        api.postData('/api/MobileMethod/CheckMobile', params).then(res => {
            if (res) {
                //UDToast.showInfo('验证成功');
                this.props.onClose();
            } else {
                UDToast.showInfo('验证失败，请重新输入');
            }
        });
    };


    render() {

        return (
            <View style={{ flex: 1, width: '100%' }}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <Flex direction={'column'}>

                        <Flex align={'center'} style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                keyboardType={'decimal-pad'}
                                maxLength={4}
                                value={this.state.no}
                                onChangeText={no => this.setState({ no })}
                                placeholder={'输入4位手机尾号'} />
                        </Flex>

                        <Button style={{ width: '100%', marginTop: 10 }} type="primary"
                            onPress={this.in}>验证</Button>
                    </Flex>

                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({   
    input: {
        fontSize: 17,
        marginLeft: 10
    }
});

