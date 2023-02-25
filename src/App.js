import './App.css';
import Grid from './grid.jsx'
import Node1 from './node'
function App() {
    const v_click = ()=>{

    }
  return (
      <>
          <div>
              <h1 style={{textAlign: "center", backgroundColor: "cyan"}}>Pathfinding Visualizer</h1>
          </div>
          <div className="visualize">
              <button style={{backgroundColor: "darkcyan",height: 50, width: 100}} onClickCapture={()=>alert("Clicked")}>Visualize</button>
          </div>
      <div className={"container"}>
        <Grid />
      </div>
      </>
  );
}

export default App;
