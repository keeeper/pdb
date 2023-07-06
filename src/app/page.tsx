'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChakraProvider } from '@chakra-ui/react'
import { Input, Button,  Heading, Text, useToast } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import BarcodeScanner from '@/components/BarcodeScanner';
import getToast from '@/utils/getToast';
import { apiUrl, endpoints } from '@/constants/api';

const Home = () => {
    const [codeInput, setCodeInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const fetchProductByCode = async (code: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/${endpoints.products}?code=${code}`);
            const data = await response.json();
            if (data.length) {
              navigateToProduct(code);
            } else {
              getToast(toast, `No product with code '${code}' found`, 'error');
            }

        } catch (error) {
            console.error('Error occurred:', error);
        }
        setIsLoading(false);
    }

    const navigateToProduct = (code: string | number) => {
        router.push(`products?code=${code}`)
    }

    const onInputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
      return setCodeInput(e.target.value)
    }

    const onCodeSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchProductByCode(codeInput);
    }

    return (
      <ChakraProvider>
        <Flex height='100vh' background='gray.100' alignItems='center' justifyContent='center'>
            <Flex alignItems='center'direction ='column' background='white' p={12} rounded={8}>
                <Heading as='h1'>Welcome to products database!</Heading>
                <Text fontSize='l'>Scan code using camera</Text>
                <BarcodeScanner onDetected={(code)=>fetchProductByCode(code)} />
                <Text fontSize='xl' mt={8} mb={8}>or enter code manually</Text>
                <form style={{width: '100%'}} onSubmit={(e)=>onCodeSubmitHandler(e)}>
                    <Flex>
                        <Input isDisabled={isLoading} size='lg' colorScheme='teal' variant='outline' onChange={(e)=>onInputChangeHandler(e)} value={codeInput} />
                        <Button isLoading={isLoading} loadingText='Loading' isDisabled={!codeInput} type='submit' ml={4} colorScheme='teal' size='lg'>Submit</Button>
                    </Flex>
                </form>
            </Flex>
        </Flex>
      </ChakraProvider>
    );
};

export default Home;