import "./App.css";
import Form from "./components/Form";
import { ProjectsProvider } from "./context/ProjectsContext";

function App() {
  return (
    <ProjectsProvider>
      <div className="App">
        <h1 className="h1-header">User projects</h1>
        <Form />
      </div>
    </ProjectsProvider>
  );
}

export default App;
