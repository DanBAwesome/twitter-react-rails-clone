import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ImageSwap.scss';


class ImageSwap extends React.Component {
    constructor(props) {
        super(props);

        this.inteval = null;
        this.imgArr = 0;

        this.state = {
            currentImage: props.images[this.imgArr],
            visible: false,
            mounted: false
        };

        this.toggleImageVisibility = this.toggleImageVisibility.bind(this);
    }


    componentDidMount() {
        // this.inteval = window.setInterval(() => {
        //     let imgArrLength = (this.props.images.length - 1);

        //     if (imgArrLength === this.imgArr) {
        //         this.imgArr = 0;
        //     }
        //     else {
        //         ++this.imgArr;
        //     }

        //     console.log(this.imgArr);

        //     this.setState({ currentImage: this.props.images[this.imgArr] });
        // }, 5000)
        this.setState({ visible: true })
    }

    toggleImageVisibility() {
        let imgArrLength = (this.props.images.length - 1);

        this.setState({ visible: !this.state.visible }, () => {
            if (this.state.visible) {
                if (imgArrLength === this.imgArr) {
                    this.imgArr = 0;
                }
                else {
                    ++this.imgArr;
                }

                this.setState({ currentImage: this.props.images[this.imgArr] });
            }
        })
    }

    render() {
        const { currentImage, visible } = this.state;
        return (
            <CSSTransition
                in={visible}
                onEntered={this.toggleImageVisibility}
                onExited={this.toggleImageVisibility}
                classNames="image-swap"
                timeout={{enter: 6000, exit: 1500}}>
                <div className="img-lg" style={{ backgroundImage: `url(${currentImage})` }}></div>
            </CSSTransition>
        )
    }
}

export default ImageSwap;