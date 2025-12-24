import { Button, Center, Group, Slider, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { IconArrowBackUp } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";


const Location: React.FC = () => {
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const session = useContext(SessionContext);

	if (!session) {
		throw new Error("Session undefined.");
	}

	const handleNext = () => {
		if (session.location.length > 0) {
			navigate("/style")
		}
		else {
			notifications.show({
				title: 'Wait!',
				message: 'You must enter a location!',
				color: 'blue',
				icon: '‼️', 
				autoClose: 2000
			  })
		}
	}


	return (
		<Center style={{ height: "100vh" }}>
			<Stack align={"center"} pos={"absolute"} top="10%">
				<Text fz={60} c={theme.colors.theme1[3]}>
					Location
				</Text>
				<Text fz={16} c={theme.colors.theme1[3]}>
					Enter the location you plan on dining in.
				</Text>
				<Text fz={16} c={theme.colors.theme1[3]} mb={15}>
					As well as the radius you would like to stay within.
				</Text>
				<TextInput
					label="Enter city, town, or neighborhood..."
					onChange={(event) => session.setLocation(event.currentTarget.value)}
					c={theme.colors.theme1[3]}
					mt={50}
					mb={25}
				/>
				<Slider
					defaultValue={40}
					color={theme.colors.theme1[4]}
					w={"90%"}
					onChange={session.setRadius}
					label={session.radius == 1 ? session.radius + " mile" : session.radius + " miles"}
					value={typeof session.radius === 'string' ? 0 : session.radius}
					max={50}
					step={1}
					min={1}
					mb={100}
				/>
				<Group w={"60%"} justify={"center"}>
					<Button
						size={"lg"}
						p={10}
						w={"50px"}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme1[4]}
						onClick={() => navigate("/")}
					>
						<IconArrowBackUp />
					</Button>
					<Button
						size={"lg"}
						p={10}
						w={"50%"}
						c={theme.colors.theme1[3]}
						bg={theme.colors.theme2[0]}
						onClick={handleNext}
					>
						Next
					</Button>
				</Group>
			</Stack>
		</Center>
	)
}

export default Location;