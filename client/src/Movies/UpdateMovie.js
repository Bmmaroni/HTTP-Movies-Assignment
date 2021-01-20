import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = (props) => {
  const [formState, setFormState] = useState(initialState);
  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setFormState(res.data)
      })
      .catch(err => console.log(err));
  }, [id])

  const handleChanges = e => {
    e.persist();
    setFormState({...formState, [e.target.name]: e.target.value});
  }

  const submitForm = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formState)
      .then(res => {
        console.log('Submitting edits:', res);
        props.setMovieList(res.data); 
        push('/');
        setFormState(initialState);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='save-wrapper'>
      <h2>Update Movie</h2>
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
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateMovie;