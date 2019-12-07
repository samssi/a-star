import GridView from "../components/GridView";
import { connect } from "react-redux";
import {plotCell, editType, toggleMode, nextStep} from "../redux/actions";


const mapStateToProps = (state) => {
    return { main: state.main }
};

const mapDispatchToProps = (dispatch) => {
    return { 
        plotCell: (x, y) => dispatch(plotCell(x, y)),
        editType: (object) => dispatch(editType(object)),
        toggleMode: (currentMode) => dispatch(toggleMode(currentMode)),
        nextStep: () => dispatch(nextStep())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GridView)