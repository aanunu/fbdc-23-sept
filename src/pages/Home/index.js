import React from 'react';
import Button from '../../component/Button';
import Status from '../../component/Status';

const link = "https://cdn.rawgit.com/kevinhermawan/ca5e0083648ba5ffb2421808d972dd9c/raw/c29c7ee02849b58024fb6a058acae33bde38cbd3/react-blog-example.json";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            keyword: ''
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        return fetch(link)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    list: res
                });
            });
    }

    handleLogin = () => {
        this.setState({
            isAuthenticated: true
        });
    }

    handleForm = event => {
        this.setState({
            keyword: event.target.value
        });
    }

    render() {
        const listStyle = {
            marginBottom: 10,
            marginLeft: 200,
            marginRight: 200
        };
        return(
            <div>
                <input onChange={this.handleForm} style={{marginLeft: 200, marginTop: 10, marginBottom: 30}} placeholder='Search here...' />
                {this.state.list &&
                    this.state.list
                        .filter(article => {
                            return (
                                article.title
                                    .toLowerCase()
                                    .includes(this.state.keyword.toLowerCase()) || 
                                article.content
                                    .toLowerCase()
                                    .includes(this.state.keyword.toLowerCase())
                            );
                        })
                        .map(article => {
                            return(
                                <div key={article.id} style={listStyle}>
                                    <strong>{article.title}</strong>
                                    <p>{article.content}</p>
                                    <hr />
                                </div>
                            );
                        })
                }
            </div>
        );
    }
}

export default Home;