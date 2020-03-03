import React, { Component } from "react";
import axios from 'axios';

export default class Tags extends Component {

    state = {
        tags: [],
    }

    componentDidMount = () => {
        axios.get('http://34.89.93.186:8080/apiv1/tags', {
            withCredentials: true
        })
        .then(response => {
            const tags = response.data.results;
            this.setState({ tags })
        })
    }

    render() {
        const { tags } = this.state;
        return (
            <>
            {tags.map(tag =>
                <option key={tag} value={tag}>{tag}</option>
                )}
            </>
        );
    }
}