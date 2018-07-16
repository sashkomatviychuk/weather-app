import React, { PureComponent } from 'react';
import Modal from 'react-responsive-modal';
import connect from 'react-redux/lib/connect/connect';

import { hideModal } from './../../actions/modal';
import { fetchCityWeather } from './../../actions/cards';
import getCities from './../../helpers/citiesHelper';

class SelectCityModal extends PureComponent {
    /**
     * Initial state
     */
    state = {
        cityName: '',
        cityId: null,
    };

    addNewCityHandler = e => {
        const { cityId, cityName } = this.state;

        if (cityId) {
            this.props.addNewCity({
                cityName,
                cityId,
            });
        }
    }

    closeModalHandler = e => {
        this.props.closeModal();
    }

    cityChangeHandler = e => {
        const options = e.target.options;
        const selectedIndex = options.selectedIndex;
        const cityName = options[selectedIndex].textContent;
        const cityId = options[selectedIndex].value;

        this.setState(() => {
            return {
                cityName,
                cityId,
            }
        });
    }

    render() {
        const { isOpen } = this.props;
        const cities = getCities();
        const optionsList = cities.map((city, key) => (<option value={city.code} key={key}>
            {city.name}
        </option>));

        return (
            <Modal open={isOpen} onClose={this.closeModalHandler} showCloseIcon={false} center>
                <div className="modal__content">
                    <h3>Add new city:</h3>
                    <div className="row-fluid">
                        <form action="" >
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    id="sel1"
                                    onChange={this.cityChangeHandler}
                                >
                                    {optionsList}
                                </select>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.addNewCityHandler}
                            >
                                Add
                            </button>
                            {' '}
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={this.closeModalHandler}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return state.modal;
}

const mapDispatchToProps = dispatch => {
    return {
        addNewCity(params) {
            dispatch(fetchCityWeather(params))
        },

        closeModal() {
            dispatch(hideModal());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectCityModal);
