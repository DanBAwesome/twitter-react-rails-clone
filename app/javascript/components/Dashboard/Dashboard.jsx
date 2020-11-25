import React from 'react';
import Requests from '../Shared/Requests';
import 'react-bootstrap';
import { Button, Card, FormControl } from 'react-bootstrap';
import './Dashboard.scss';
import { Link, useParams } from 'react-router-dom';

const trendsList = [
    '#Hongkong',
    '#Ruby',
    '#foobarbaz',
    '#rails',
    '#API'
]

const UserItem = (props) => {
    return (
        <div className={props.className}>
            <span className="small text-muted">
                {props.text}
            </span>
            <div className="text-info">
                {props.subText}
            </div>
        </div>
    )
}

const Tweet = (props) => {
    const { tweet, deleteTweet, belongsToUser } = props
    return (
        <React.Fragment>
            <div className="tweet-content py-2 px-4">
                <a href={`/${tweet.username}`} className="font-weight-bold">{tweet.username}</a> &nbsp;
                <span className="text-black-50">@{tweet.username}</span>
                {belongsToUser && <a onClick={() => deleteTweet(tweet.id)} className="float-right" href="#">Delete</a>}
                {tweet.image && <img className="d-block" src={tweet.image} />}
                <div>{tweet.message}</div>

            </div>
            <hr className="m-0" />
        </React.Fragment>
    )
}

class Dashboard extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            selectedUser: '',
            tweetMessage: '',
            tweetImage: null,
            imagePreview: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.createTweet = this.createTweet.bind(this);
        this.removeTweet = this.removeTweet.bind(this);
        this.imageSelect = this.imageSelect.bind(this);
    }

    countTweets() {
        const { username } = this.props.user ?? this.props;
        const { tweets, selectedUser } = this.state;

        if (selectedUser) {
            return tweets.filter(tweet => tweet.username === selectedUser).length;
        }

        return tweets.filter(tweet => tweet.username === username).length;
    }

    getTweets() {
        const username = this.props?.match?.params?.username

        Requests.get(`/tweets${username ? `/${username}` : ''}`).then(data => {
            if (this._isMounted) {
                this.setState({
                    tweets: data.tweets,
                    selectedUser: data.username
                })
            }
        });

    }

    imageSelect(event) {
        this.setState({ tweetImage: event.target.files[0], imagePreview: URL.createObjectURL(event.target.files[0]) });
    }

    createTweet(event) {
        event.preventDefault();
        let { tweetMessage, tweetImage, tweets } = this.state;

        const data = new FormData();

        data.append('tweet[message]', tweetMessage);
        if (tweetImage) {
            data.append('tweet[image]', tweetImage, tweetImage.name);
        }

        Requests.post("/tweets", data).then(
            (data) => {
                this.getTweets();
                this.setState({
                    tweetMessage: '',
                    tweetImage: null,
                    tweetPreview: null
                })
            }
        );
    }

    removeTweet(id) {
        const data = new FormData();

        data.append('id', id);

        Requests.delete("/tweets", data).then((data) => {
            this.getTweets();
        })

    }

    handleChange(event) {
        this.setState({ tweetMessage: event.target.value });
    }

    componentDidMount() {
        this._isMounted = true
        this.getTweets();
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        const { tweets, tweetMessage, tweetImage, selectedUser, imagePreview } = this.state;
        const { username } = this.props.user ?? this.props;

        return (
            <React.Fragment>
                <div className="container" id="dashboard">
                    <div className="row">
                        <div className="col-3">
                            <Card id="user">
                                <Card.Body>
                                    <div className="username">
                                        {selectedUser ?? username}
                                    </div>
                                    <div className="handle">
                                        @{selectedUser ?? username}
                                    </div>
                                    <div className="row">
                                        <UserItem text="Tweets" subText={this.countTweets()} className="col-4" />
                                        <UserItem text="Following" subText="0" className="col-4" />
                                        <UserItem text="Followers" subText="0" className="col-4" />
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card id="trending">
                                <Card.Body>
                                    <div className="heading">Trends</div>
                                    {trendsList.map((trend, i) => {
                                        return (
                                            <a key={i} href="#">{trend}</a>
                                        )
                                    })}
                                </Card.Body>
                            </Card>
                        </div>
                        <Card className="col-6" id="tweetSection">
                            <div id="createTweet">
                                <form onSubmit={this.createTweet} name="tweetForm">
                                    <FormControl as="textarea" className="mb-2"
                                        placeholder="What's Happening"
                                        value={tweetMessage} onChange={this.handleChange}
                                        maxLength="160"></FormControl>
                                    <div className="col-12">
                                        <div className="float-right row">
                                            <input id="fileUpload" type="file"
                                                hidden onChange={this.imageSelect}
                                                accept="image/*" />
                                            <label htmlFor="fileUpload"
                                                className="m-auto font-weight-bold">Upload Image</label> &nbsp;
                                            {tweetImage && <img width="32" height="32" src={imagePreview} />}
                                            <div className="m-auto">{160 - tweetMessage.length}</div> &nbsp;&nbsp;
                                            <Button type="submit" disabled={!tweetMessage}>Tweet</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                {
                                    tweets.map((tweet, i) => {
                                        return <Tweet key={tweet.id} tweet={tweet}
                                            deleteTweet={this.removeTweet}
                                            belongsToUser={tweet.username === username} />
                                    })
                                }
                            </div>
                        </Card>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default Dashboard