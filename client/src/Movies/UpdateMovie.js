import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = (props) => {
  const [formState, setFormState] = useState(initialState);

  const handleChanges = e => {
    e.preventDefault();
    setFormState(...formState, [e.target.name]: e.target.value);
  }

  const submitForm = e => {
    e.preventDefault();
    axios
      .put(`/api/movies/${id}`, formState)
      .then(res => {
        console.log('Submitting edits:', res.data);
        props.setMovieList(res.data);
      })
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form>
        <input
          type='text'
          name='title'
          value={formState.title}
          onChange={handleChanges}
        />
        <input
          type='text'
          name='director'
          value={formState.director}
          onChange={handleChanges}
        />
        <input
          type='text'
          name='metascore'
          value={formState.metascore}
          onChange={handleChanges}
        />
        <input
          type='text'
          name='stars'
          value={formState.stars}
          onChange={handleChanges}
        />
      </form>
    </div>
  )
}

export default UpdateMovie;