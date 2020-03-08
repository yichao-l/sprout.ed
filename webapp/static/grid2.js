

const maxRow = 10;
const maxCol = 15;

function classList(classes) {
  return Object
    .entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(' ');
}

function Plot(props) {
  var liClasses = classList({
   'plot': true,
   'plantable': props.plantable
 });
  return (
   <button className={liClasses} onClick={props.onClick}>
    {props.icon}
    </button>
  );
}

class Board extends React.Component {

  markUnPlantable(centre, radius){
    var row = centre % maxCol;
    var col = centre - row*maxCol;

    for (var i = row - radius; i <= row + radius; i++){
      for (var j = col - radius; j<= col + radius; j++) {
        this.state.plantable[i*maxCol + j ];
      }
    }

  }


  constructor(props) {
    super(props);
    this.state = {
      icons: Array(maxCol*maxRow).fill(null),
      plantable: Array(maxCol*maxRow).fill(true),
    };
    for (var key in plotsJson['plants']){
      var plot = plotsJson['plants'][key]['plot']
      var icon = plotsJson['plants'][key]['plantType']
      this.state.icons[plot] = icon;
      //markUnPlantable(plot,1);
      var centre = plot
      var radius = 1;

      var row = centre % maxCol;
      var col = centre - row*maxCol;

      for (var i = row - radius; i <= row + radius; i++){
        for (var j = col - radius; j<= col + radius; j++) {
          this.state.plantable[i*maxCol + j ] = false;
        }
      }

      this.state.plantable[plot] = false;
    }

    for (var a in this.state.plantable){
      if (this.state.plantable[a]){
        this.state.icons[a] = '➕'
      }
    }
  }


  handleClick(i) {
    const icons = this.state.icons.slice();
    icons[i] = '💧';
    this.setState({
      icons: icons,
    });
  }

  renderPlot(i) {

    return (
      <Plot
        onClick={() => this.handleClick(i)}
        icon={this.state.icons[i]}
        plantable={this.state.plantable[i]}
      />
    );
  }

render(){
    const workspace = "Appleton 3";
    const rows = [];



    for (var y = 0; y<maxRow;y++){
      const row = [];
      for (var x = 0;x <maxCol; x++) {
        row.push(this.renderPlot(y*maxCol + x));
      }
      rows.push(  <div className="plant-row">{row}</div>)
    }


    return (
      <div>
        <div className="workspace">{workspace}</div>
        {rows}
      </div>
    );
}

}

ReactDOM.render(<Board />, document.getElementById('root'));
