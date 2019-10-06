import GridView from "../components/GridView";
import { connect } from "react-redux";
import { plotCell, editType, toggleMode } from "../redux/actions";


const mapStateToProps = (state) => {
    return { table: state.table }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        plotCell: (x, y, objectType) => dispatch(plotCell(x, y, objectType)),
        editType: (objectValue) => dispatch(editType(objectValue)),
        toggleMode: (currentMode) => dispatch(toggleMode(currentMode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridView)