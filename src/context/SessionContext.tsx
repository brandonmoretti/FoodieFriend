import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import { notifications } from '@mantine/notifications'

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
	recommendation: string;
	setRecommendation: (recommendation: string) => void;
	getRestaurant: (location: string, radius: number | string, style: string, budget: string, wildcards: string[]) => Promise<string>
	
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [location, setLocation] = useState('');
	const [radius, setRadius] = useState<number | string>(1);
	const [style, setStyle] = useState('');
	const [budget, setBudget] = useState('');
	const [wildcards, setWildcards] = useState<string[]>([]);
	const [recommendation, setRecommendation] = useState<string>('');
  
	const getRestaurant = async (
	  location: string,
	  radius: number | string,
	  style: string,
	  budget: string,
	  wildcards: string[]
	): Promise<string> => {
	  try {
		const response = await fetch('http://localhost:5000/api/recommend', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			location: location,
			radius: radius,
			style: style,
			budget: budget,
			wildcards: wildcards,
		  }),
		});
  
		const data = await response.json();
  
		if (response.ok) {
		  console.log('Recommendation:', data.recommendation);
		  return data.recommendation; 
		} else {
		  throw new Error(data.error || 'Failed to fetch recommendation');
		}
	  } catch (error) {
		console.error('Error:', error);
		notifications.show({
		  title: 'Error',
		  message: 'Failed to fetch recommendation',
		  color: 'red',
		});
		throw error; // Rethrow the error so callers know the promise failed
	  }
	};
  
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
		  recommendation,
		  setRecommendation,
		  getRestaurant,
		}}
	  >
		{children}
	  </SessionContext.Provider>
	);
  };
