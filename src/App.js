import React from 'react';

import Header from './components/Header';
import CardsList from './contianers/cards/CardsList';
import SelectCityModal from './contianers/modals/SelectCityModal';

export default function App() {
	return (<>
		<Header />
		<CardsList />
		<SelectCityModal />
	</>)
}
