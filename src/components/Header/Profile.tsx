import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
    showProfileDate?: boolean
}

export function Profile({ showProfileDate = true }: ProfileProps) {
    return (
        <Flex
            align="center"
        >
            {showProfileDate && (
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
            )}
            <Avatar
                size="md"
                name="André Felipe"
                src="https://github.com/AndreFelipe97.png"
            ></Avatar>
        </Flex>
    );
}