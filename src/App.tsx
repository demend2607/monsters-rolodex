import { useState, useEffect, ChangeEvent } from 'react';

import SearchBox from './components/search-box/SearchBox.component';
import CardList from './components/card-list/CardList.component';

import { getData } from './utils/data.usilt';
import './App.css';

export type Monster = {
	id: string;
	name: string;
	email: string;
};

const App = () => {
	const [searchField, setSearchField] = useState('');
	const [monsters, setMonsters] = useState<Monster[]>([]);
	const [filteredMonsters, setFilterdMonsters] = useState(monsters);

	useEffect(() => {
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then((response) => response.json())
		// 	.then((users) => setMonsters(users));
		const fetchUsers = async () => {
			const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
			setMonsters(users);
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});
		setFilterdMonsters(newFilteredMonsters);
	}, [monsters, searchField]);
	console.log(filteredMonsters);
	const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">Monster Rolodex</h1>
			<SearchBox className="search-box" onChangeHandler={onSearchChange} placeholder="search monsters" />
			<CardList monsters={filteredMonsters} />
		</div>
	);
};

// class App extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			monsters: [],
// 			searchField: '',
// 		};
// 	}

// componentDidMount() {
// 	fetch('https://jsonplaceholder.typicode.com/users')
// 		.then((response) => response.json())
// 		.then((users) =>
// 			this.setState(() => {
// 				return { monsters: users };
// 			})
// 		);
// }

// 	onSearchChange = (event) => {
// 		const searchField = event.target.value.toLocaleLowerCase();
// 		this.setState(() => {
// 			return { searchField };
// 		});
// 	};

// 	render() {
// 		const { monsters, searchField } = this.state;
// 		const { onSearchChange } = this;

// 		const filteredMonsters = monsters.filter((monster) => {
// 			return monster.name.toLocaleLowerCase().includes(searchField);
// 		});
// 		return (
// 			<div className="App">
// 				<h1 className="app-title"> Monsters Rolodex</h1>
// 				<SearchBox onChangeHandler={onSearchChange} placeholder="search monsters" className="search-box" />
// 				<CardList monsters={filteredMonsters} />
// 			</div>
// 		);
// 	}
// }

export default App;
