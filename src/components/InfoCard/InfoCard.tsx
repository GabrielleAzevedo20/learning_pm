import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Info, ButtonInfo } from './styles';

interface InfoCardProps extends TouchableOpacityProps {
  info: string;
  info2: string;
  info3: string;
}

export function InfoCard({ info, info2, info3, ...rest }: InfoCardProps) {
    return (
        <ButtonInfo
          {...rest}
        > 
            <Info>{info}, {info2}, {info3}</Info>
            </ButtonInfo>
    )
}
