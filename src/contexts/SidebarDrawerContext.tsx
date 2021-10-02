import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter } from 'next/router';

interface SidebarDrawerProviderProps {
    children: ReactNode
}

type SidebarDrawerContextDate = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextDate);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {
    const disclosure = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        disclosure.onClose();
    }, [router.asPath]);

    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)