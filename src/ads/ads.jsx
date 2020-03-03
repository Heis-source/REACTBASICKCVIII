import React, { Component } from "react";
import Tags from "./tags.jsx";
import makingURL from './makingurl.js';
import './ads.css'
import { Link } from "react-router-dom";

export default class Ads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            name: '',
            sell: '',
            pricemin: 0,
            pricemax: 0,
            tags: null
        };
    }

    search = (filter) => {
        // eslint-disable-next-line no-undef
        axios.get('http://34.89.93.186:8080/apiv1/anuncios' + filter, {
            withCredentials: true
        })
        .then(response => {
            const data = response.data.results;
            this.setState({ data });
        })
        .catch(error => {
            alert("You Shall Not Pass! Log in first!");
            this.props.history.push('/login');
        })
    }
    
    onSubmit = (evt) => {
        evt.preventDefault();
        this.setState({ searched: true });
        const finalURL = makingURL([this.state.name], [this.state.sell], [this.state.pricemin], [this.state.pricemax], [this.state.tags]);
        this.search(finalURL.toString());
    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    render() {
        const { data } = this.state;
        const renderAds = data.map((d) =>
        <div class="card mb-3" key={d._id}>
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src={d.photo} class="card-img" alt={d.name} />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{d.name}</h5>
                        <p class="card-text">{d.description}</p>
                        <p class="card-text">Price: <span>{d.price}</span></p>
                        <p class="card-text">Tags: <span>{d.tags}</span></p>
                        <p class="card-text">Type: <span>{d.type}</span></p>
                    </div>
                    <div class="col-auto my-1">
                       <Link to={`/details/${d._id}`}><button class="btn btn-primary">I want to see more</button></Link>
                       <Link to={`/edit/${d._id}`}><button class="btn btn-warning">Edit</button></Link>
                    </div>
                </div>
            </div>
        </div>
        );
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div class="card bg-light mb-3 styled-card" >
                    <div class="card-header">Filters! Filters!</div>
                    <div class="card-body">
                    <form onSubmit={this.onSubmit}>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" name='name' onChange={this.onChangeInput} value={this.state.name} placeholder='Name...' class="form-control" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Price</span>
                        </div>
                        <input type="number" name='pricemin' onChange={this.onChangeInput} class="form-control" placeholder="Min" aria-describedby="basic-addon1" />
                        <input type="number" name='pricemax' onChange={this.onChangeInput} class="form-control" placeholder="Max" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Tags</span>
                        </div>
                        <select name='tags' onChange={this.onChangeInput} value={this.state.tags} class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <Tags />
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Sell or buy?</span>
                        </div>
                        <select onChange={this.onChangeInput} value={this.state.sell} name="sell" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option value='null'>All</option>
                            <option value='true'>Sell</option>
                            <option value='false'>Buy</option>
                        </select>
                    </div>
                    <div class="col-auto my-1">
                        <button type="submit" class="btn btn-primary">Filter</button>
                        <Link to={`/login`}><button class="btn btn-danger margin-button">Go back</button></Link>
                    </div>
                </form>
                    </div>
                </div>
                {renderAds}
            </div>
        );
    }
}
