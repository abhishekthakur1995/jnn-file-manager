import React from 'react'
import { Grid, Nav } from 'react-bootstrap'
import '../scss/sidebar.scss'

class SideBar extends React.Component {
	render() {
		return (
			<Grid bsClass="wrapper">
				<nav id="sidebar">
					<Grid bsClass="sidebar-header">
						<h3>Bootstrap Sidebar</h3>
						<strong>BS</strong>
					</Grid>

					<ul className="list-unstyled components">
					    <li className="active">
					        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
					            <i className="glyphicon glyphicon-home"></i>
					            Title-1
					        </a>
					        <ul className="collapse list-unstyled" id="homeSubmenu">
					            <li><a href="#">Home 1</a></li>
					            <li><a href="#">Home 2</a></li>
					            <li><a href="#">Home 3</a></li>
					        </ul>
					    </li>
					    <li>
					        <a href="#">
					            <i className="glyphicon glyphicon-briefcase"></i>
					            Title-2
					        </a>
					        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
					            <i className="glyphicon glyphicon-duplicate"></i>
					            Title-3
					        </a>
					        <ul className="collapse list-unstyled" id="pageSubmenu">
					            <li><a href="#">Page 1</a></li>
					            <li><a href="#">Page 2</a></li>
					            <li><a href="#">Page 3</a></li>
					        </ul>
					    </li>
					    <li>
					        <a href="#">
					            <i className="glyphicon glyphicon-link"></i>
					            Title-4
					        </a>
					    </li>
					    <li>
					        <a href="#">
					            <i className="glyphicon glyphicon-paperclip"></i>
					            Title-5
					        </a>
					    </li>
					    <li>
					        <a href="#">
					            <i className="glyphicon glyphicon-send"></i>
					            Title-6
					        </a>
					    </li>
					</ul>
				</nav>
			</Grid>
		)
	}
}

export default SideBar