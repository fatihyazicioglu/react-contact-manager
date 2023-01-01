import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// it makes sense to have two components:
// AddPersonForm: a form with the text field and Add button.
// PeopleList: a list of contacts.

// AddPersonForm uses state to manage the value of the text field:

function AddPersonForm(props) {
  // 1. component
  const [person, setPerson] = useState("");

  function handleChange(e) {
    setPerson(e.target.value);
  }

  // our PeopleList can call the handleSubmit function that it received when the form is submitted, to add a new person to the list:

  function handleSubmit(e) {
    props.handleSubmit(person);
    // clear the value of the text field using setPerson('') after adding a new person.
    setPerson("");
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add new contact'
        onChange={handleChange}
        value={person}
      />
      <button type='submit'>Add</button>
    </form>
  );
}

// For now, we just prevent the default behavior when the form is submitted.

// PeopleList received an array representing the contacts and renders a list on the page:
function PeopleList(props) {
  // 2.component
  const arr = props.data;
  const listItems = arr.map((val, index) => <li key={index}>{val}</li>);
  return <ul>{listItems}</ul>;
}

//  a parent component called ContactManager, which includes the AddPersonForm and PeopleList as child components and holds the contacts list in its state:

function ContactManager(props) {
  const [contacts, setContacts] = useState(props.data);

  //this component is to add a new person to our contacts state array:

  function addPerson(name) {
    setContacts([...contacts, name]);
  }

  return (
    <div>
      <AddPersonForm handleSubmit={addPerson} />
      {/* props can be used to pass down not only state, but also functions, that may manipulate the state.
This way, we are able to store the application state in the parent and allow its child components to use and manipulate the state. */}
      <PeopleList data={contacts} />
    </div>
  );
}

// Now we can render our components on the page and include some initial data:

const contacts = ["James Smith", "Thomas Anderson", "Bruce Wayne"];

ReactDOM.render(
  <ContactManager data={contacts} />,
  document.getElementById("root")
);
