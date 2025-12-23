import {
	Button,
	Center, Group, SimpleGrid,
	Stack,
	Text, UnstyledButton,
	useMantineTheme
} from '@mantine/core';
import { IconArrowBackUp, IconDice5 } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

const Style = () => {
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const session = useContext(SessionContext);

	if (!session) {
		throw new Error('Session undefined.');
	}

	function handleRandom() {
		session?.setStyle("random")
	}

	return (
		<Center style={{ height: '100%' }}>
			<Stack align={"center"} pos={"absolute"} top="10%">
				<Text fz={60} c={theme.colors.theme1[3]}>
					Budget
				</Text>
				<Text fz={20} c={theme.colors.theme1[3]}>
					Select price range of your meal.
				</Text>
				<ImageCheckboxes />
				<Group mt={60} w={'90%'} justify={'center'}>
					<Button
						size={'lg'}
						p={10}
						w={'15%'}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme1[4]}
						onClick={() => navigate('/style')}
					>
						<IconArrowBackUp />
					</Button>
					<Button
						size={'lg'}
						p={10}
						w={'50%'}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme2[0]}
						onClick={() => navigate('/wildcards')}
					>
						Next
					</Button>
					<Button
						size={'lg'}
						p={10}
						w={'15%'}
						c={theme.colors.theme1[3]}
						bg={'green'}
						onClick={handleRandom}
					>
						<IconDice5 />
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
	'$10-$20 ($)',
	'$20-$40 ($$)',
	'$40-$60 ($$$)',
	'$60 < ($$$$)'
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

	const isChecked = session.budget === title;

	const handleClick = () => {
		session.setBudget(isChecked ? '' : title);
	};


	return (

		<UnstyledButton
			onClick={handleClick}
			data-checked={isChecked || undefined}
			className={`${classes.budgetButton} ${isChecked ? classes.checked : ''}`}
		>
			<div className={classes.body}>
				<Text fz={15} fw={500} size="sm" lh={1} c={isChecked ? theme.colors.theme1[3] : theme.colors.theme2[0]}>
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
			<SimpleGrid cols={1}>{items}</SimpleGrid>
		</Stack>
	);
}