import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
	return (
		<>
			<header>
				<h2>titulo header</h2>
			</header>
			<Outlet/>
			<footer>
				<h2>titulo footer</h2>
			</footer>
		</>
	)
}
