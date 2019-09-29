import GridView from "../components/GridView"
import { connect } from "react-redux";


const mapStateToProps = state => {
    return { table: state.table }
}

const mapDispatchToProps = state => {
    return { table: state.table }
}

export default connect(mapStateToProps, {})(GridView)