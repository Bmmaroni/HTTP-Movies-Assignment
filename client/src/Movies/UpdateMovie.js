import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: ''
}

const UpdateMovie = (props) => {
  const [formState, setFormState] = useState(initialState);
  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        const response = {
          ...res.data,
          stars: res.data.stars.toString()
        }
        setFormState(response);
      })
      .catch(err => console.log(err));
  }, [id])

  const handleChanges = e => {
    e.persist();
    setFormState({...formState, [e.target.name]: e.target.value});
  }

  const submitForm = e => {
    e.preventDefault();
    const updatedMovie = {
      ...formState,
      stars: formState.stars.split(',')
    }
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
      .then(res => {
        console.log('Submitting edits:', res);
        props.setMovieList(
          props.movieList.map(item => {
            if(item.id === res.data.id) {
              return res.data
            } else {
              return item;
            }
          })
        );
        setFormState(initialState);
        push('/');
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