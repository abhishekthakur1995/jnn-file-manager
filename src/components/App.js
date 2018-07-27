import React from 'react'
// import EntryForm from './EntryForm.js'
import NavBar from './NavBar.js'
// import LoginForm from './LoginForm.js'
import SideBar from './SideBar.js'

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<SideBar />
			</div>
		)
	}
}

export default App
