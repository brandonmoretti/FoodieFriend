import {
	Button,
	Center, Group, SimpleGrid,
	Stack,
	Text, UnstyledButton,
	useMantineTheme
} from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';


const Style = () => {
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const session = useContext(SessionContext);

	if (!session) {
		throw new Error('Session undefined.');
	}


	return (
		<Center style={{ height: '100%' }}>
			<Stack align={"center"} pos={"absolute"} top="10%">
				<Text fz={60} c={theme.colors.theme1[3]}>
					Wild Cards
				</Text>
				<Text fz={16} c={theme.colors.theme1[3]}>
					Select specific preferences.
				</Text>
				<ImageCheckboxes />
				<Group w={'60%'} justify={'center'}>
					<Button
						size={'lg'}
						p={10}
						w={'50px'}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme1[4]}
						onClick={() => navigate('/budget')}
					>
						<IconArrowBackUp />
					</Button>
					<Button
						size={'lg'}
						p={10}
						w={'50%'}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme2[0]}
						onClick={() => console.log(session)}
					>
						Submit
					</Button>
				</Group>
			</Stack>
		</Center>
	);
};

export default Style;

// ---------------------------------Mantine Component Code----------------------------------

import classes from './ImageCheckboxes.module.css';

const mockdata = [
	'Date Night',
	'New Opening',
	'Family Friendly',
	'Hidden Gem',
	'Fast & Casual',
	'Good Drinks',
	'Quiet',
	'Outdoor Seating',
	'Authentic',
	'Late Night',
	'Lively',
	'Adventerous',
	'Diet Friendly',
	'Group Friendly',
	'Unique Menu',
	'Trendy',
];

interface ImageCheckboxProps {
	title: string,
};
function ImageCheckbox({ title }: ImageCheckboxProps) {
	const session = useContext(SessionContext);
	const theme = useMantineTheme();

	if (!session) {
		throw new Error('Session undefined.');
	}

	const isChecked = session.wildcards.includes(title);

	const handleClick = () => {
		if (isChecked) {
			session.setWildcards(session.wildcards.filter((wildcard) => wildcard !== title));
		} else {
			session.setWildcards([...session.wildcards, title]);
		}
	};

	return (
		<UnstyledButton
			onClick={handleClick}
			data-checked={isChecked || undefined}
			className={`${classes.button} ${isChecked ? classes.checked : ''}`}
		>
			<div className={classes.body}>
				<Text
					fz={10}
					fw={500}
					size="sm"
					lh={1}
					c={isChecked ? theme.colors.theme1[3] : theme.colors.theme2[0]}
				>
					{title}
				</Text>
			</div>
		</UnstyledButton>
	);
}

function ImageCheckboxes() {
	const items = mockdata.map((item) => (
		<ImageCheckbox title={item} key={item} />
	));
	return (
		<Stack>
			<SimpleGrid cols={4}>{items}</SimpleGrid>
		</Stack>
	);
}