import {connect} from "react-redux";

const ModalViewer = ({modal}) => modal;

const mapStateToProps = (state) => ({ modal: state.modal });

export default connect(mapStateToProps)(ModalViewer);