# state-objects

This project demonstrates updating state properties whose values are objects.

The steps to run this are:

1. `npm install`
1. `npm run dev`
1. Browse localhost:5173.

Experiment with changing state by opening the DevTools Console
and entering JavaScript statements like the following:

1. `state = WrecState.get('demo')`
1. `state.person.firstName = 'Sam'`
1. `state.person.address.zip = '98765'`
1. `state.person.address = {street: '10 Galaxy', city: 'St. Peters', state: 'MO', zip: '63376'}`
