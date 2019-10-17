import Moment from 'moment';

export default {
   formatDate(date){
    Moment.locale('en')
    const dat = date;
    const formattedDate = Moment(dat).startOf('hour').fromNow();
    return formattedDate
  }
}
