import React from "react";
import Link from "next/link";

import MainLayout from "../components/MainLayout";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";

import "../static/styles/Search.css";

class Search extends React.Component {
	state = {
		questions: [],
		showPost: false
	}

	constructor(props) {
		super(props);

		this.querySearch = this.querySearch.bind(this);
		this.updatePostQuestion = this.updatePostQuestion.bind(this);
	}

	async querySearch(query) {
		try {
			const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
			const json = await res.json();

			console.log("search results:", json);

			this.setState({
				questions: json.result
			});
		} catch (error) {
			console.error(error);
		}
	}

	updatePostQuestion(authState) {
		this.setState(() => ({
			showPost: authState === "logged in"
		}));
	}

	render() { // TODO: Only show the option to post a new question once a user searches something, and hide it when the query text field changes.
		const {showPost} = this.state;

		return (
			<MainLayout authStateListener={this.updatePostQuestion}>
				<SearchForm search={this.querySearch}/>
				<QuestionList questions={this.state.questions}/>  {/* TODO: Set the list to `loading` when searching a query. */}
				{showPost ?
					<div className="post__question">
						<p>Couldn't find a result that answers your question?</p> {/* eslint-disable-line react/no-unescaped-entities */}
						<Link href="/post-question">
							<a>Post a new question</a>
						</Link>
					</div> :
					null}
			</MainLayout>
		);
	}
}

export default Search;
