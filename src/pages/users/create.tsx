import { Box, Flex, Heading, Divider, VStack, HStack, SimpleGrid, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';

type UserCreateFormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const usersCreateFormSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha é obrigatória').min(6, 'No mínimo 6 caracteres'),
    passwordConfirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
})

export default function UserCreate() {
    const router = useRouter();
    const createUser = useMutation(async (user: UserCreateFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        });

        return response.data.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    });

    const {register, handleSubmit, formState} = useForm({
        resolver: yupResolver(usersCreateFormSchema),
    });
    
    const { errors } = formState;

    const handleUserForm: SubmitHandler<UserCreateFormData> = async (values, event) => {
        await createUser.mutateAsync(values);
        router.push('/users');
    }

    return (
        <Box>
            <Header />
            <Flex
                w="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px="6"
            >
                <Sidebar />
                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleUserForm)}
                >
                    <Heading
                        size="lg"
                        fontWeight="normal"
                    >
                        Criar usuário
                    </Heading>
                    <Divider my="6" borderColor="gray.700" />
                    
                    <VStack spacing="8">
                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                            w="100%"
                        >
                            <Input
                                name="name"
                                label="Nome completo"
                                error={errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                label="E-mail"
                                type="e-mail"
                                error={errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>
                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                            w="100%"
                        >
                            <Input
                                name="password"
                                label="Senha"
                                type="password"
                                error={errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="passwordConfirmation"
                                label="Confirmação da senha"
                                type="password"
                                error={errors.passwordConfirmation}
                                {...register('passwordConfirmation')}
                            />
                        </SimpleGrid>
                    </VStack>
                    <Flex
                        mt="8"
                        justify="flex-end"
                    >
                        <HStack
                            spacing="4"
                        >
                            <Link href="/users" passHref>
                                <Button
                                    as="a"
                                    colorScheme="whiteAlpha"
                                >
                                    Cancelar
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                colorScheme="pink"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}