import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface SessionContextType {
	location: string;
	setLocation: (location: string) => void;
	radius: number | string;
	setRadius: (radius: number | string) => void;
	style: string;
	setStyle: (style: string) => void;
	budget: string,
	setBudget: (budget: string) => void;
	wildcards: string[];
	setWildcards: (wildcards: string[]) => void
	
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [location, setLocation] = useState('');
    const [radius, setRadius] = useState<number | string>(1)
	const [style, setStyle] = useState('');
	const [budget, setBudget] = useState('');
	const [wildcards, setWildcards] = useState<string[]>([])

	return (
		<SessionContext.Provider
			value={{
				location,
				setLocation,
				radius,
				setRadius,
				style,
				setStyle,
				budget,
				setBudget,
				wildcards,
				setWildcards,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};