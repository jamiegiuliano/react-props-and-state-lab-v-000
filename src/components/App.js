import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    };
  }

  changeType = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    });
  };

  fetchPets = () => {
    let api_endpoint = '/api/pets';

    if (this.state.filters.type !== 'all') {
      api_endpoint += `?type=${this.state.filters.type}`;
    }

    fetch(api_endpoint)
      .then(result => result.json())
      .then(pets => this.setState({ pets }));
  };

  adoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType}
                       onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
