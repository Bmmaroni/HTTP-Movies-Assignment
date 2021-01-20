import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: ''
}

const AddMovie = (props) => {
  const [formState, setFormState] = useState(initialState);
  const { push } = useHistory();

  const handleChanges = e => {
    e.persist();
    setFormState({...formState, [e.target.name]: e.target.value});
  };

  const submitForm = e => {
    e.preventDefault();
    const updatedMovie = {
      ...formState,
      stars: formState.stars.split(',')
    }
    axios
      .post(`http://localhost:5000/api/movies`, updatedMovie)
      .then(res => {
        console.log('Adding Movie:', res.data);
        props.setMovieList(res.data);
        setFormState(initialState);
        push('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='save-wrapper'>
      <h2>Add A Movie</h2>
      <form onSubmit={submitForm}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={formState.title}
          onChange={handleChanges}
        />
        <input
          type='text'
          name='director'
          placeholder='Director'
          value={formState.director}
          onChange={handleChanges}
        />
        <input
          type='text'
          name='metascore'
          placeholder='Metascore'
          value={formState.metascore}
          onChange={handleChanges}
        />
        <input
          type='text'
          name='stars'
          placeholder='Stars'
          value={formState.stars}
          onChange={handleChanges}
        />
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddMovie;