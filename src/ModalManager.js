import {connect} from "react-redux";

const ModalManager = ({modal}) => modal;

const mapStateToProps = (state) => ({ modal: state.modal });

export default connect(mapStateToProps)(ModalManager);