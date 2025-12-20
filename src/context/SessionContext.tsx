import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface SessionContextType {
	location: string;
	setLocation: (location: string) => void;
	radius: number | string;
	setRadius: (radius: number | string) => void;
	
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [location, setLocation] = useState('');
    const [radius, setRadius] = useState<number | string>(1)


	return (
		<SessionContext.Provider
			value={{
				location,
				setLocation,
				radius,
				setRadius
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};