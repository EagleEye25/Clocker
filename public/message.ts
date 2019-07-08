import AWN from 'awesome-notifications';
const msg = new AWN();
export class Message {
  showMessage(from, status) {
    switch (from) {
      case 'addCal': {
        if (status === 201) {
          msg.success('Successfully Added Card');
        }
        break;
      }
      case 'addTimes': {

        break;
      }
      case 'addCard': {

        break;
      }
      case 'addEmp': {

        break;
      }
      case 'assignCard': {

        break;
      }
      case 'assignCal': {

        break;
      }
      case 'assignTime': {

        break;
      }
      case 'addReason': {

        break;
      }
    }
  }
}