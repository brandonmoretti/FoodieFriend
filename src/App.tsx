import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Location from './components/Location';
import StartPage from './components/StartPage';
import { SessionProvider } from "./context/SessionContext";
import Layout from './Layout';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<SessionProvider><Layout /></SessionProvider>}>
				<Route index element={<StartPage />} />
				<Route path="/location" element={<Location />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default App;
