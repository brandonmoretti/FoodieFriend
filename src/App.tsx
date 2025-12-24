import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Budget from "./components/Budget";
import Location from './components/Location';
import ProgressBar from "./components/ProgressBar";
import Recommendation from "./components/Recommendation";
import StartPage from './components/StartPage';
import Style from "./components/Style";
import WildCards from "./components/WildCards";
import { SessionProvider } from "./context/SessionContext";
import Layout from './Layout';

const App: React.FC = () => (
	<BrowserRouter>
		<ProgressBar />
		<Routes>
			<Route path="/" element={<SessionProvider><Layout /></SessionProvider>}>
				<Route index element={<StartPage />} />
				<Route path="/location" element={<Location />} />
				<Route path="/style" element={<Style />} />
				<Route path="/budget" element={<Budget />} />
				<Route path="/wildcards" element={<WildCards />} />
				<Route path="/recommendation" element={<Recommendation />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default App;
