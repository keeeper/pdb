'use client';

import { useState, useEffect } from 'react';
import { Grid, GridItem, Button, useToast } from '@chakra-ui/react';
import FormElement from './FormElement';
import { apiUrl, endpoints } from '@/constants/api';
import getToast from '@/utils/getToast';
import getInputType from '@/utils/getInputType';
import getEncodedData from '@/utils/getEncodedData';
import removeLeadingZeros from '@/utils/removeLeadingZeros';
import { FormDataProps, Product } from '@/types/types';

const Form: React.FC<FormDataProps> = ({formData}) => {
    const [formFields, setFormFields] = useState<Product>();
    const [showExpirationDate, setShowExpirationDate] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (!Object.keys(formData).length) return;
        const parsedRequiresBestBeforeDate = JSON.parse(formData?.requires_best_before_date as string);
        if (!('best_before_date' in formData)) {
            setFormFields({...formData, requires_best_before_date: parsedRequiresBestBeforeDate, best_before_date: ''})
        } else {
            setFormFields({...formData, requires_best_before_date: parsedRequiresBestBeforeDate})
        }
        setShowExpirationDate(parsedRequiresBestBeforeDate);
        
    }, [formData]);

    const onInputChangeHandler = (e:React.ChangeEvent<HTMLFormElement>) => {
        if (!formFields) return;

        const key = e.target.name;
        const value = e.target.value;
        
        if (key === 'requires_best_before_date') {
            setShowExpirationDate(JSON.parse(value));
            setFormFields({
                ...formFields,
                [key]: value,
                best_before_date: JSON.parse(value) ? formFields?.best_before_date : '',
            })
            return;
        } 
        setFormFields({
            ...formFields,
            [key]: value
        })
    }
    
    const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formattedFormFields:any = formFields;
        if (formFields?.trade_item_descriptor) {
            formattedFormFields.trade_item_unit_descriptor = formFields.trade_item_descriptor;
            delete formattedFormFields.trade_item_descriptor;
        }
        formattedFormFields.code = removeLeadingZeros(formattedFormFields.code);
        const encodedFormData:Product = getEncodedData(formattedFormFields);

        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/${endpoints.products}/${formFields?.code}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(encodedFormData),
            });
            if (response.ok) {
                getToast(toast, 'Product updated', 'success');
            } else {
                getToast(toast, 'Failed to update product', 'error');
            }
        } catch (error) {
            getToast(toast, 'Error occurred', 'error');
            console.error('Error occurred:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={(e)=>onSubmitHandler(e)}>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {!!formFields && Object.entries(formFields).map(([key, value]) => {
                    {if (key === 'best_before_date' && !showExpirationDate) {
                        return null;
                    }}
                    return (
                        <GridItem key={key}>
                            <FormElement 
                                type={getInputType(key)} 
                                isDisabled={key === 'code' || isLoading} 
                                isRequired={key === 'best_before_date'} 
                                name={key} 
                                label={key} 
                                value={value} 
                                onChangeHandler={onInputChangeHandler}
                            />
                        </GridItem>
                    )
                })}
            </Grid>
            <Button isLoading={isLoading} loadingText='Saving' mt={8} type='submit' colorScheme='teal' size='lg'>Save</Button>
        </form>
    )
}

export default Form;
