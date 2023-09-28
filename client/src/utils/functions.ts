export const ELEMENTSPERPAGE = 10;

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function capitalizeFirstLetterRemoveUnderline(string: string) {
  const temp = string.charAt(0).toUpperCase() + string.slice(1);
  return temp.replaceAll('_', ' ');
}

export const getTimereportDateTime = (date: string) => {
  const d = new Date(date);

  const getMonth = () => {
    switch (d.getMonth()) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return '';
    }
  };
  const getPostMeridiem = () => {
    if (Number(d.getHours()) > 12) {
      return 'PM';
    }
    return 'AM';
  };
  const handleDay = () => {
    if (Number(d.getDay()) % 10 === 2) {
      return `${d.getDay()}nd`;
    } else if (Number(d.getDay()) % 10 === 3) {
      return `${d.getDay()}rd`;
    } else {
      return `${d.getDay()}th`;
    }
  };
  const handleMinutes = () => {
    if (d.getMinutes() < 10) {
      return `0${d.getMinutes()}`;
    }
    return `${d.getMinutes()}`;
  };
  const getFullDate = () => {
    return `${getMonth()} ${handleDay()} ${d.getFullYear()} ${d.getHours()}:${handleMinutes()} ${getPostMeridiem()}`;
  };
  return getFullDate();
};

export const getEmployeeInitials = (firstName: string, lastName: string) => {
  let initials = '';
  if (firstName.length > 0) {
    initials += firstName.charAt(0);
  }
  if (lastName.length > 0) {
    initials += lastName.charAt(0);
  }
  return initials;
};

export const calculateTotalPages = (totalElements: number): number => {
  return Math.ceil(totalElements / ELEMENTSPERPAGE);
};
