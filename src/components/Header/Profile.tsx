import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

export function Profile() {
    return (
        <Flex
            align="center"
        >
            <Box
                mr="4"
                textAlign="right"
            >
                <Text>André Felipe</Text>
                <Text
                    color="gray.300"
                    fontSize="small"
                >
                    andrefeliperf17@gmail.com
                </Text>
            </Box>

            <Avatar
                size="md"
                name="André Felipe"
                src="https://github.com/AndreFelipe97.png"
            ></Avatar>
        </Flex>
    );
}