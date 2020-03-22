import React from 'react'
import TestModal from './testModal';
import { connect } from 'react-redux';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const modalLookup = {
    TestModal,
    LoginModal,
    RegisterModal
}

const mapState = (state) => ({
    currentModel : state.modals
})

const modalManager = ({currentModel}) => {
    let renderdModal; 

    if (currentModel) {
        console.log(currentModel);
        const {modalType, modalProps} = currentModel;
        const ModalCompomamet = modalLookup[modalType]

        renderdModal = <ModalCompomamet {...modalProps} />
    }
    return (
        <span>{renderdModal}</span>
    )
}


export default connect(mapState)(modalManager)
