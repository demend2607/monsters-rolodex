import { useState, useEffect } from 'react';

import SearchBox from './components/search-box/SearchBox.component';
import CardList from './components/card-list/CardList.component';
import logo from './logo.svg';
import './App.css';

const App = () => {
	const [searchField, setSearchField] = useState('');
	const [title, setTitle] = useState('');
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilterdMonsters] = useState(monsters);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});
		setFilterdMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (event) => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	const onTitleChange = (event) => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setTitle(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">{title}</h1>

			<SearchBox onChangeHandler={onSearchChange} placeholder="search monsters" className="search-box" />
			<SearchBox onChangeHandler={onTitleChange} placeholder="set title" className="title-search-box" />
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
