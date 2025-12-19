import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import './App.css'
import StartPage from './components/StartPage';
import Location from './components/Location';
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
