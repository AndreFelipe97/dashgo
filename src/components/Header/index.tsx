import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react';

import { Profile } from './Profile';
import { NotificationNav } from './NotificatioNav';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';

export function Header() {
    const { onOpen } = useSidebarDrawer()

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    return (
        <Flex
            as="header"
            w="100%"
            maxW={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >
            {!isWideVersion && (
                <IconButton
                    aria-label="Open Navigation"
                    variant="unstyled"
                    icon={
                        <Icon
                            as={RiMenuLine}
                            fontSize="24"
                            onClick={onOpen}
                            mr="2" 
                        />
                    }
                >
                </IconButton>
            )}
            <Logo />
            { isWideVersion && <SearchBox />}
            <Flex
                align="center"
                ml="auto"
            >
                <NotificationNav />
                <Profile showProfileDate={isWideVersion} />
            </Flex>
        </Flex>
    );
}