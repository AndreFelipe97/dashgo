import { FormLabel, FormControl, Input as InputC, InputProps as InputPropsc } from '@chakra-ui/react';

interface InputProps extends InputPropsc {
    name: string;
    label?: string;
}

export function Input({name, label, ...rest}: InputProps) {
    return (
        <FormControl>
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
            <InputC
                name={name}
                id={name}
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                bgColor: 'gray.900'
                }}
                size="lg"
                {...rest}
            />
        </FormControl>
    );
}