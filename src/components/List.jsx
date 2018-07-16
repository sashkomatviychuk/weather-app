import React from 'react'
import connect from 'react-redux/lib/connect/connect';

import Card from './Card'

class CardsList extends React.Component {

    render() {
        const list = this.props.weatherList.map((item, i) => <Card {...item} key={i} />);

        return (
            <div className="container-fluid">
                {list}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.cards;
};

export default connect(mapStateToProps)(CardsList);