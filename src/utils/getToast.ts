const getToast = (toast:({})=>void, title: string, status: string) => {
    toast({
        title,
        status,
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
    });
}

export default getToast;