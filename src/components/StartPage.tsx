import { Button, Center, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage: React.FC = () => {
	const theme = useMantineTheme();
	const navigate = useNavigate();

	return (
		<Center style={{ height: "100vh" }}>
			<Stack align="center">
				<Text fz={70} c={theme.colors.theme1[3]}>
					Foodie Friend
				</Text>
				<Text fz={20} c={theme.colors.theme1[3]} mb={75}>
					No more “I don’t know.”
				</Text>
				<Button
					size={"lg"}
					p={10}
					w={"30%"}
					c={theme.colors.theme1[3]}
					bg={theme.colors.theme2[0]}
					onClick={() => navigate("/location")}
				>
					Let's Go!
				</Button>
				<Text mt={75} fz={10} c={theme.colors.theme1[3]}>
					Note: Results are driven by OpenAI, therefore recommendations may not always be accurate or sensible.
				</Text>
				<Text mt={0} fz={10} c={theme.colors.theme1[3]}>
					Give it a few tries and you may find it fun when you land on something you like!
				</Text>
			</Stack>
		</Center>
	)

}

export default StartPage