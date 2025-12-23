import {
	Button,
	Center, Group,
	Modal,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
	UnstyledButton,
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
		<Center style={{ height: '100vh' }}>
			<Stack align="center">
				<Text fz={70} c={theme.colors.theme1[3]}>
					Style
				</Text>
				<Text fz={20} c={theme.colors.theme1[3]}>
					Select the style of food you want to eat.
				</Text>
				<ImageCheckboxes />
				<Group w={'70%'} justify={'center'}>
					<Button
						size={'lg'}
						p={10}
						w={'15%'}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme1[4]}
						onClick={() => navigate('/location')}
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
	'American',
	'Mexican',
	'Italian',
	'Chinese',
	'Japanese',
	'Thai',
	'Indian',
	'Mediterranean',
	'Eastern',
	'Latin American',
	'Korean',
	'Vietnamese',
	'BBQ',
	'Seafood',
	'Pizza',
	'Other',
];

interface ImageCheckboxProps {
	title: string,
};
function ImageCheckbox({ title }: ImageCheckboxProps) {
	const session = useContext(SessionContext);
	const theme = useMantineTheme();
	const [isModalOpened, setModalOpened] = useState(false); // Modal visibility state
	const [otherStyle, setOtherStyle] = useState('');

	if (!session) {
		throw new Error('Session undefined.');
	}

	const isChecked = session.style === title || (title === 'Other' && session.style === otherStyle);

	const handleClick = () => {
		if (title === 'Other') {
			setModalOpened(true);
		} else {
			session.setStyle(isChecked ? '' : title);
		}
	};

	const handleConfirm = () => {
		session.setStyle(otherStyle);
		setModalOpened(false);
	};

	return (
		<>
			<UnstyledButton
				onClick={handleClick}
				data-checked={isChecked || undefined}
				className={`${classes.button} ${isChecked ? classes.checked : ''}`}
			>
				<div className={classes.body}>
					<Text fz={10} fw={500} size="sm" lh={1} c={isChecked ? theme.colors.theme1[3] : theme.colors.theme1[2]}>
						{title}
					</Text>
				</div>
			</UnstyledButton>
			{title === 'Other' && (
				<Modal
					opened={isModalOpened}
					onClose={() => setModalOpened(false)}
					title="Enter custom style"
					centered
				>

					<TextInput
						label="Custom Style"
						placeholder="Enter your preferred style..."
						value={otherStyle}
						onChange={(event) => setOtherStyle(event.currentTarget.value)}
					/>
					<Button justify={"center"} mt="md" onClick={handleConfirm}>
						Confirm
					</Button>
				</Modal>
			)}
		</>
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