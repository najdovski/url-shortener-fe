import React from 'react';

const NotificationModal = ({message, closeModal}) => {
  return (
      <>
        <div className="modal fade show d-block backdrop" id="notificationModal" tabIndex="-1" role="dialog" aria-modal="true" aria-hidden="false">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className={'modal-content text-white border-0 shadow ' + (message.error ? 'bg-danger' : 'bg-success')}>             
              <div className="row p-3 pb-4 no-gutters">
                <div className="col-12 text-right">
                  <span onClick={closeModal} className="cursor-pointer text-white"><i className="fas fa-times mr-2"></i></span>
                </div>
                <div className="col-auto align-self-center m-3 pb-2">
                  <i className={'fas fa-3x ' + (message.error ? 'fa-times' : 'fa-check')}></i>
                </div>
                <div className="col align-self-center mt-1 m-3 pb-2 text-left">
                  <div className="h4 font-weight-bold">{message.error ? 'Error!' : 'Success!' }</div>
                  <div className="font-weight-bold">{message.text}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default NotificationModal
