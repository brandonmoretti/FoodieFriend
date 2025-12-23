import { Container, Progress, useMantineTheme } from '@mantine/core';
import { useLocation } from 'react-router-dom';

const ProgressBar = () => {
  const location = useLocation();
  const theme = useMantineTheme()

  // Define the steps (order matters)
  const steps = ['/location', '/style', '/budget', '/wildcards'];
  const currentStep = steps.indexOf(location.pathname) + 1; 
  const progress = (currentStep / steps.length) * 100; 

  return (
    <Container w="250px" style={{ padding: '10px', position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Progress value={progress} size="md" color={theme.colors.theme1[4]} />
    </Container>
  );
};

export default ProgressBar;