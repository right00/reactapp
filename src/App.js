import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import Main from './Main';
const initialFormState = { name: '', description: '' }

function App() {

  return (
    <div className="App">
      <Main />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);