import './App.css';
import Grid from './grid.jsx'
import Node1 from './node'
function App() {
  return (
      <>
          <div>
              <h1 style={{textAlign: "center"}}>Pathfinding Visualizer</h1>
          </div>
          <div className="visualize">
              <button style={{backgroundColor: "darkcyan",height: 50, width: 100}}>Visualize</button>
          </div>
      <div className={"container"}>
        <Grid />
      </div>
      </>
  );
}

export default App;
