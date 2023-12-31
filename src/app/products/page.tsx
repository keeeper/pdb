'use client';
import { useState, useEffect } from 'react';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js';
import { useSearchParams } from 'next/navigation'
import { Flex } from '@chakra-ui/layout';
import {apiUrl, endpoints} from '@/constants/api';
import Form from '@/components/Form';
import { Product as ProductType} from '@/types/types';

const Product = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [formData, setFormData] = useState<ProductType | undefined>();

    useEffect(()=> {
        if (code) fetchProductByCode(code);
    }, [code])

    const fetchProductByCode = async (code: string) => {
        try {
            const response = await fetch(`${apiUrl}/${endpoints.products}?code=${code}`);
            const data = await response.json();
            setFormData(data[0]);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    return (
        <ChakraProvider>
            <Flex alignItems='center' justifyContent='center'>
                <Flex direction ='column' background='white' p={8} rounded={8}>
                    <Link href='/' color='teal.500' mb={6} _hover={{ textDecoration: 'none', color: 'teal.700' }}>Back to scanner</Link>
                    <Heading as='h1' mb={10}>Update product details</Heading>
                    {!!formData && (<Form formData={formData} />)}
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}

export default Product;