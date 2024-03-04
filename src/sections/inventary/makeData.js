import React from 'react';

const data = [
  {
    id: 1,
    firstName: 'Elenora',
    lastName: 'Wilkinson',
    company: 'Feest - Reilly',
    city: 'Hertaland',
    country: 'Qatar',
  },
  {
    id: 2,
    firstName: 'Berneice',
    lastName: 'Feil',
    company: 'Deckow, Leuschke and Jaskolski',
    city: 'Millcreek',
    country: 'Nepal',
  },
  // Resto de los datos...
];

const PersonTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Company</th>
          <th>City</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.company}</td>
            <td>{person.city}</td>
            <td>{person.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonTable;
