import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: ''
}

const AddMovie = (props) => {
  const [formState, setFormState] = useState(initialState);

  return (
    <div>
      <h2>Add A Movie</h2>
      <form>
        <input
          type='text'
          name='title'
          value={formState.title}
          onChange={handleChanges}
        />
      </form>
    </div>
  )
}

export default AddMovie;