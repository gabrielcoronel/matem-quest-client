export default class {
  static toString(period) {
    const formattedMonth = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ][period.month - 1]
    const formattedPeriod = `${formattedMonth} - ${period.year}`

    return formattedPeriod
  }

  static getCurrent() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const currentPeriod = {
      month: currentMonth,
      year: currentYear
    }

    return currentPeriod
  }

  static getNext(period) {
    const possibleNextMonth = period.month + 1
    const nextMonth = possibleNextMonth <= 12 ? possibleNextMonth : possibleNextMonth % 12
    const nextYear = possibleNextMonth <= 12 ? period.year : period.year + 1

    const nextPeriod = {
      month: nextMonth,
      year: nextYear
    }

    return nextPeriod
  }

  static getPrevious(period) {
    const possiblePreviousMonth = period.month - 1
    const previousMonth = possiblePreviousMonth > 0 ? possiblePreviousMonth : 12 + possiblePreviousMonth
    const previousYear = possiblePreviousMonth > 0 ? period.year : period.year - 1

    const previousPeriod = {
      month: previousMonth,
      year: previousYear
    }

    return previousPeriod
  }
}
