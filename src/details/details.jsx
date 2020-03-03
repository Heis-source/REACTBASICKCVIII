import React, { Component } from "react";
import './details.css'
import { Link } from "react-router-dom";

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        };
    }

    componentDidMount = () => {
        this.search(this.props.match.params.id);
    }   
    
    search = (filter) => {
        // eslint-disable-next-line no-undef
        axios.get('http://34.89.93.186:8080/apiv1/anuncios/' + filter, {
            withCredentials: true
        })
        .then(response => {
            const data = response.data.result;
            this.setState({ data });
        })
        .catch(error => {
            alert("You Shall Not Pass! Log in first!");
            this.props.history.push('/login');
        })
    }

    render() {
        const { data } = this.state;
        const { tags } = this.state.data;
        const finalTag = tags;
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div class="styled-card">
                    <div class="col mb-4">
                        <div class="card">
                        <img src={data.photo} class="card-img-top" alt={data.name} />
                            <div class="card-body">
                                <h5 class="card-title">{data.name}</h5>
                                <p class="card-text">Price: <span>{data.price}</span></p>
                                <p class="card-text">Tags: <span>{finalTag}</span></p>
                                <p class="card-text">Type: <span>{data.type}</span></p>
                            </div>
                        </div>
                    </div>
                    <Link to={`/ads`}><button type="submit" class="btn btn-danger" >Go back</button></Link>
                </div>
            </div>
        )
    }
}
