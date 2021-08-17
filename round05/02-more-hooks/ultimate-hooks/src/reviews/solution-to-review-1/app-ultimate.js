import React, { useState, useEffect } from "react";
import axios from "axios";

// ** enter commit sha of your repository in here **
export const commitSHA = "dff23db";

const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};
	const reset = () => {
		setValue("");
	};

	return {
		type,
		value,
		onChange,
		reset,
	};
};

const useResource = (baseUrl) => {
	const [resources, setResources] = useState([]);

	// ...
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setResources(await axios.get(baseUrl).then((res) => res.data));
	};

	const create = async (resource) => {
		const created = await axios.post(baseUrl, resource).then((res) => res.data);
		setResources(resources.concat(created));
	};

	const service = {
		create,
	};

	return [resources, service];
};

export const App = () => {
	const content = useField("text");
	const name = useField("text");
	const number = useField("text");

	const [notes, noteService] = useResource("http://localhost:3005/notes");
	const [persons, personService] = useResource("http://localhost:3005/persons");

	const handleNoteSubmit = (event) => {
		event.preventDefault();
		noteService.create({ content: content.value });
		content.reset();
	};

	const handlePersonSubmit = (event) => {
		event.preventDefault();
		personService.create({ name: name.value, number: number.value });
		name.reset();
		number.reset();
	};

	// Remove the reset field
	const noReset = ({ reset, ...others }) => others;

	return (
		<div>
			<h2>notes</h2>
			<form onSubmit={handleNoteSubmit}>
				<input {...noReset(content)} />
				<button>create</button>
			</form>
			{notes.map((n) => (
				<p key={n.id}>{n.content}</p>
			))}

			<h2>persons</h2>
			<form onSubmit={handlePersonSubmit}>
				name <input {...noReset(name)} /> <br />
				number <input {...noReset(number)} />
				<button>create</button>
			</form>
			{persons.map((n) => (
				<p key={n.id}>
					{n.name} {n.number}
				</p>
			))}
		</div>
	);
};
