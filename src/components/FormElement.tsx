'use client';

import { Input, Select, FormControl, FormLabel } from '@chakra-ui/react';
import { FormElementProps } from '@/types/types';

const FormElement:React.FC<FormElementProps> = ({label, type, name, value, onChangeHandler, isDisabled, isRequired}) => {
    return (
        <FormControl isRequired={isRequired} isDisabled={isDisabled}>
            <FormLabel>{label}</FormLabel>
            {type === 'select' ? (
                <Select name={name} value={value}  onChange={onChangeHandler}>
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                </Select>
            ) : (
                <Input type={type} name={name} value={value}  onChange={onChangeHandler} />
            )}
        </FormControl>
    )
}

export default FormElement;
