import React from 'react'
import EntryForm from './EntryForm.js'
import NavBar from './NavBar.js'

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<EntryForm />
			</div>
		)
	}
}

export default App
