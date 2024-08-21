import React from 'react';
import { Input, IInputProps } from 'native-base';

const CustomInput: React.FC<IInputProps> = (props) => {
    return (
        <Input
            variant="outline"
            placeholderTextColor="gray.400"
            size="lg"
            bg="white"
            borderRadius={10}
            borderColor="gray.300"
            _focus={{
                borderColor: "blue.500",
                bg: "gray.100"
            }}
            {...props}
        />
    );
};

export default CustomInput;
