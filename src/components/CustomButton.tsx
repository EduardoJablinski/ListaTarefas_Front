import React from 'react';
import { Button, IButtonProps, Text } from 'native-base';

const CustomButton: React.FC<IButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            size="lg"
            bg="blue.500"
            borderRadius={10}
            _pressed={{ bg: "blue.600" }}
            {...props}
        >
            {typeof children === 'string' ? (
                <Text color="white" fontWeight="bold">
                    {children}
                </Text>
            ) : (
                children
            )}
        </Button>
    );
};

export default CustomButton;
