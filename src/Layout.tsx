import {
	AppShell, useMantineTheme
} from '@mantine/core';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { SessionContext } from './context/SessionContext';

const Layout: React.FC = () => {
	const session = useContext(SessionContext);
	const theme = useMantineTheme();
	if (session === undefined) {
		throw new Error("Layout must be a child of sessionContext.");
	}

	return (
		<AppShell
		>
			<AppShell.Main bg={theme.colors.theme2[3]} h="100dvh">
				<Outlet />
			</AppShell.Main>

		</AppShell>
	);
};

export default Layout;