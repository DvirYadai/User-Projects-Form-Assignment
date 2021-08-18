# Welcome to my repo!

## Here i'm going to present to you my assignment, hope you will enjoy.

- First of all, [here](https://dviryadai.github.io/User-Projects-Form-Assignment/) is my github page, explore the website as you wish but don't break it 😉
- To run the project in local host you need to do few steps:
  - Fork or clone this repository to your local machine.
  - Open the folder in terminal and run `npm i` to install the dependencies.
  - To run the client - run in terminal `npm start`.
- To run tests - run in terminal `npm run test`, <b>Attention!</b> you need to run the client in second terminal before.

### Now i'm going to explain my decisions and my components.

#### Components

- `Form.js` - this component contain the form itself, all other components besides `App.js` goes inside this component.
- `JsonView.js` - this is where the form's data in JSON format is presented, in default this component is hidden and the rest of the form is visible, you can ask me why render both of them in the beginning when you can render one and change to the other when a boolean change? the answer is as following: if i render only the form in the beginning, switch to jsonView and then switch back to the form, the form will be empty, all the details i have entered will be deleted because the form is rerendering when i switch back to him, this is why i decided to play with hidden and visible on `JsonView.js` and the rest of the form.
- `projectsName.js` - this component renders an input field, a button and name labels so the user can add project name.
- `ProjectsNameLabel.js` - this component renders custom label with delete button and i have decided to put it in other component for readability.
- `ProjectDetails.js` - this is where all the details of specific project goes. it's in a dedicated component because this is form on its own and its renders multiple times, and of course for readability as well.

#### context

- I have created `ProjectsContext.js` to help me with the state of the project, i didn't want to write multiple useStates in `App.js` and pass them to the children because it's a mess, the context help me to export custom functions, that uses the states, to all of the components no matter where they are.

#### Functions that worth reviewing:

- `addProjectsDetails` in `ProjectsContext.js`.
- `submit` in `Form.js`.
