import actionTypes from '../constants'

export const requestRide = () => {
  return {
    type: actionTypes.REQUEST_RIDE,
    payload: Promise.resolve({
      pickupAddress: "100 Institute Rd.",
      requestedAt: 1400293420
    })
  }
}