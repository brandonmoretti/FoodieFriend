import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {
	emotionTransform,
	MantineEmotionProvider,
} from '@mantine/emotion';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<MantineProvider
		stylesTransform={emotionTransform}
		theme={theme}
	>
		<MantineEmotionProvider>
			<Notifications />
			<App />
		</MantineEmotionProvider>
	</MantineProvider>
)