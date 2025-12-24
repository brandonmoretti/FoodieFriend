import { Button, Center, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

const Recommendation: React.FC = () => {
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const session = useContext(SessionContext);

	if (!session) {
		throw new Error("Session undefined.");
	}

	const handleAgain = () => {
		session.setLocation("");
		session.setRadius("");
		session.setStyle("");
		session.setBudget("");
		session.setWildcards([]);
		navigate('/')
	}

	return (
		<Center style={{ height: '100%' }}>
			<Stack align={"center"} pos={"absolute"} top="10%">
				<Text fz={40} c={theme.colors.theme1[3]} mb={50}>
					Recommendation
				</Text>
				<Text fz={16} w={250} c={theme.colors.theme1[3]} mb={25}>
					{session.recommendation}
				</Text>
				<Group mt={60} w={'100%'} justify={'center'}>
					<Button
						size={'lg'}
						p={10}
						w={'50px'}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme1[4]}
						onClick={() => navigate('/wildcards')}
					>
						<IconArrowBackUp />
					</Button>
					<Button
						size={'lg'}
						p={10}
						w={'40%'}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme2[0]}
						onClick={handleAgain}
					>
						Again?
					</Button>
				</Group>
			</Stack>
		</Center>
	)
}
export default Recommendation