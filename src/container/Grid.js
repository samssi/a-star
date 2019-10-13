import GridView from "../components/GridView";
import { connect } from "react-redux";
import {plotCell, editType, toggleMode, nextStep} from "../redux/actions";


const mapStateToProps = (state) => {
    return { table: state.table }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        plotCell: (x, y) => dispatch(plotCell(x, y)),
        editType: (objectValue) => dispatch(editType(objectValue)),
        toggleMode: (currentMode) => dispatch(toggleMode(currentMode)),
        nextStep: () => dispatch(nextStep())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridView)