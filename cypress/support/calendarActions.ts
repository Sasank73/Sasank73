import 'cypress-wait-until'
let result,
  dayResult,
  dayFutureDates,
  dayTicketsDates,
  weekFuturedates,
  monthTime,
  weekTime,
  dayTime
//locators
const ticketMenuIcon = '[data-testid="InboxRoundedIcon"]'
const createTicketBtn = '[data-testid="tickets-landing-page-create-ticket-button"]'
const closeTicketButton = '[title="Close ticket details"]'
const createTicketButton = '[data-testid="tickets-create-submit-create-ticket-button"]'
const option = '[role="option"]'
const ticketTitle = '#title'
const ticketDesc = '#description'
const location = '#location'
const space = '#space'
const issue = '#issue'
const scheduleBtn = '[role="dialog"] .MuiButton-endDecorator'
const schedulePopup = '.MuiPopover-paper'
const checkboxInSchedule = '.MuiPopover-paper [type="checkbox"]'
const submitBtn = '[type="submit"]'
const cancelBtn = '.MuiPopover-paper .MuiButton-variantPlain'
const todayDate = '.rdrDayToday'
const frequency = '#frequency'
const month = '#byMonthDay'
const interval = '#interval'
const time = '[type="text"]'
const verifyWeekText = '[role="group"]+div .MuiTypography-root'
const weekSelector = '.MuiPopover-paper [role="group"] button'
const clockPointer = '.MuiClockPointer-thumb'
const okBtn = '.MuiDialogActions-root .MuiButtonBase-root'
const scheduleMonth = '.MuiPopover-paper .MuiTypography-root'
const duePeriod = '[type="numeric"]'
const duePeriodSelector = '.MuiPopover-paper [aria-expanded="false"]'
const calendarBtn = '[aria-label="calendar"]'
const monthInCalendar = '[class*=toolbar-label]'
const nextMonthBtn = '[aria-label="Next"]'
const dateSelector = '.rbc-date-cell'
const verifyPageCreation = '[role="alert"]'
const discardBtn = '.MuiModalDialog-root .MuiButton-variantSolid'
const weekBtn = '[aria-label="Week"]'
const dayBtn = '[aria-label="Day"]'
const monthBtn = '[aria-label="Month"]'
const ticketContainer = '.rbc-agenda-event-cell'
const dayMonthDropDown = '.MuiSelect-listbox.Mui-expanded'
const backBtn = '[aria-label="Back"]'
const todayBtn = '[aria-label="Today"]'

//commands
Cypress.Commands.add('clickOnTicketMenu', () => {
  cy.waitUntil(() => cy.get(ticketMenuIcon).should('exist'))
  cy.get(ticketMenuIcon).should('exist').click()
})

Cypress.Commands.add('verifyCreateTicketBtn', () => {
  cy.get(createTicketBtn).should('not.be.disabled').and('be.visible')
})

Cypress.Commands.add('clcikOnCreateTicketBtn', () => {
  cy.get(createTicketBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('verifyTicketCreationPage', () => {
  cy.contains('Title').should('exist')
  cy.contains('Description').should('exist')
  cy.contains('Location').should('exist')
  cy.contains('Space').should('exist')
  cy.contains('Issue').should('exist')
  cy.contains('Priority (optional)').should('exist')
  cy.get(createTicketButton).should('not.be.disabled').and('exist')
})

Cypress.Commands.add('enterTicketdetails', (titleName, desc, locName, spaceName, issueName) => {
  cy.waitUntil(() => cy.get(ticketTitle).should('exist'))
  cy.get(ticketTitle).clear().type(titleName).should('have.value', titleName)
  cy.get(ticketDesc).clear().type(desc).should('have.value', desc)
  cy.get(location).click()
  cy.get(option).contains(locName).click()
  cy.get(space).click()
  cy.get(option).contains(spaceName).click()
  cy.verifyTicketCreationPage()
  cy.get(issue).click()
  cy.get(option).contains(issueName).click()
  cy.verifyTicketCreationPage()
})

Cypress.Commands.add('verifySchedulePopup', () => {
  cy.waitUntil(() => cy.get(scheduleBtn).should('exist'))
  cy.get(scheduleBtn).should('exist').should('not.be.disabled').click()
  cy.get(schedulePopup).should('exist')
  cy.contains('Set schedule').should('exist')
  cy.get(checkboxInSchedule).should('exist')
  cy.get(submitBtn).should('not.be.disabled').and('be.visible')
  cy.get(cancelBtn).should('not.be.disabled').and('be.visible')
})

Cypress.Commands.add('waitForSchedulePopup', () => {
  cy.get(schedulePopup).should('exist')
  cy.contains('Set schedule').should('exist')
  cy.get(checkboxInSchedule).should('exist')
  cy.get(submitBtn).should('not.be.disabled').and('be.visible')
  cy.get(cancelBtn).should('not.be.disabled').and('be.visible')
})

Cypress.Commands.add('scheduleMonthTicket', (freqncy, intervl, dayOfMonth) => {
  cy.get(checkboxInSchedule).should('exist').click()
  cy.get(frequency).should('exist').click()
  cy.get(option).should('exist').contains(freqncy).click()
  cy.get(interval)
    .type('{selectAll}' + intervl)
    .should('have.value', intervl)
  cy.saveSchedule()
  cy.verifySchedulePopup()
  cy.get(month).should('exist').click()
  cy.get(dayMonthDropDown)
    .should('exist')
    .invoke('show')
    .find('[role="option"]')
    .contains(dayOfMonth)
    .then(($option) => {
      if ($option.length > 0) {
        cy.wrap($option).scrollIntoView().click({ force: true })
      }
    })
  cy.createTicketPage()
  cy.get(schedulePopup).then(($popover) => {
    if ($popover.length > 0) {
      cy.verifyscheduleMessage(intervl, dayOfMonth)
    } else {
      cy.get(schedulePopup).then(($popover) => {
        if ($popover.length > 0) {
          cy.verifyscheduleMessage(intervl, dayOfMonth)
        } else {
          cy.verifyMonthSchedule(dayOfMonth, intervl)
        }
      })
    }
  })

  cy.get(time)
    .invoke('attr', 'value')
    .then((value) => {
      monthTime = value
    })
})

Cypress.Commands.add('createTicketPage', () => {
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
  cy.verifyTicketCreationPage()
})

Cypress.Commands.add('verifyscheduleMessage', (intervl, dayOfMonth: number) => {
  cy.get(scheduleMonth)
    .eq(2)
    .invoke('text')
    .then((data) => {
      let intervalValue

      if (intervl !== 1 && dayOfMonth === 29) {
        intervalValue = `Every ${intervl} months on the ${dayOfMonth - 1}th and ${dayOfMonth}th`
      } else if (intervl !== 1 && dayOfMonth === 30) {
        intervalValue = `Every ${intervl} months on the ${dayOfMonth - 2}th, ${
          dayOfMonth - 1
        }th and ${dayOfMonth}th`
      } else if (intervl !== 1 && dayOfMonth === 31) {
        intervalValue = `Every ${intervl} months on the ${dayOfMonth - 3}th, ${dayOfMonth - 2}th, ${
          dayOfMonth - 1
        }th and ${dayOfMonth}st`
      } else if (intervl === 1 && dayOfMonth === 29) {
        intervalValue = `Every month on the ${dayOfMonth - 1}th and ${dayOfMonth}th`
      } else if (intervl === 1 && dayOfMonth === 30) {
        intervalValue = `Every month on the ${dayOfMonth - 2}th, ${
          dayOfMonth - 1
        }th and ${dayOfMonth}th`
      } else if (intervl === 1 && dayOfMonth === 31) {
        intervalValue = `Every month on the ${dayOfMonth - 3}th, ${dayOfMonth - 2}th, ${
          dayOfMonth - 1
        }th and ${dayOfMonth}st`
      } else if (dayOfMonth <= 28 && intervl === 1) {
        intervalValue = `Every month on the ${dayOfMonth}`
      } else {
        intervalValue = `Every ${intervl} months on the ${dayOfMonth}`
      }
      cy.wrap(data).should('include', intervalValue)
    })
})

Cypress.Commands.add('verifyMonthSchedule', (dayOfMonth, intervl) => {
  cy.get(scheduleBtn).should('exist').should('not.be.disabled').click()
  cy.get(month)
    .invoke('text')
    .then((val) => {
      if (val !== dayOfMonth) {
        cy.get('.MuiSelect-listbox')
          .should('exist')
          .invoke('show')
          .find('[role="option"]')
          .contains(dayOfMonth)
          .then(($option) => {
            if ($option.length > 0) {
              cy.wrap($option).click()
              cy.createTicketPage()
            }
          })
      } else {
        cy.verifyscheduleMessage(intervl, dayOfMonth)
      }
    })
})

function generateWeeksValue() {
  const options = { weekday: 'long' }
  const weekName = new Intl.DateTimeFormat('en-US', options).format(new Date())
  const abbreviatedWeekday = weekName.slice(0, 2)
  return abbreviatedWeekday
}

Cypress.Commands.add('scheduleWeekTicket', (freqncy, intervl) => {
  cy.waitUntil(() => cy.get(checkboxInSchedule).should('exist'))
  cy.get(checkboxInSchedule).should('exist').click()
  cy.waitForSchedulePopup()
  cy.waitForSchedulePopup()
  cy.waitForSchedulePopup()
  cy.waitForSchedulePopup()
  cy.waitUntil(() => cy.get(interval).should('be.visible'))
  cy.get(interval)
    .type('{selectAll}' + intervl)
    .should('have.value', intervl)
  cy.waitUntil(() => cy.get(frequency).should('exist'))
  cy.get(frequency).should('exist').click()
  cy.get(option).should('exist').contains(freqncy).click()
  let abbreviatedWeekday = generateWeeksValue()
  cy.get(weekSelector).contains(abbreviatedWeekday).click()
  cy.get(verifyWeekText)
    .invoke('text')
    .then((data) => {
      const value = intervl !== 1 ? `Every ${intervl}` : 'Every'
      cy.wrap(data).should('include', value)
    })
  cy.get(time)
    .invoke('attr', 'value')
    .then((value) => {
      weekTime = value
    })
})

Cypress.Commands.add('verifyDueDate', (dueSpan, dueDays) => {
  cy.contains('Show in inbox').should('exist')
  cy.get(duePeriodSelector)
    .eq(0)
    .invoke('text')
    .then((data) => {
      cy.wrap(data).should('include', 'Custom')
    })
  cy.get(duePeriodSelector)
    .eq(1)
    .invoke('text')
    .then((data) => {
      cy.wrap(data).should('include', dueSpan)
    })
  cy.get(duePeriod)
    .should('exist')
    .invoke('val')
    .then((data) => {
      cy.wrap(data).should('eq', dueDays)
    })
})

Cypress.Commands.add('saveSchedule', () => {
  cy.get(submitBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('clickOnCreateTicketButton', () => {
  cy.get(createTicketButton).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('clickOnCloseTicketButton', () => {
  cy.get(verifyPageCreation).should('not.exist')
  cy.get(closeTicketButton).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('clickOnDiscardBtn', () => {
  cy.get(discardBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('clickOnCalendarBtn', () => {
  cy.get(calendarBtn).should('not.be.disabled').and('be.visible').click()
})

function formatFutureDate(date) {
  const dayOfMonth = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return { dayOfMonth, month, year, formatted: `${dayOfMonth} ${month} ${year}` }
}

function calculateAndFormatFutureDates(intervalMonths, dayOfMonth, numberOfDates) {
  const today = new Date()
  const futureDates = []
  let i = 1
  while (futureDates.length < numberOfDates) {
    const futureDate = new Date(today)
    futureDate.setMonth(today.getMonth() + i * intervalMonths)
    futureDate.setDate(dayOfMonth)
    futureDates.push(futureDate)
    i++
  }

  const dates = []
  const monthsYears = []

  futureDates.forEach((date) => {
    const { dayOfMonth, month, year, formatted } = formatFutureDate(date)
    dates.push(dayOfMonth)
    monthsYears.push(`${month} ${year}`)
  })

  return { dates, monthsYears }
}

function iterateMonths(index) {
  const month = result.monthsYears[index]
  return cy
    .get(monthInCalendar)
    .invoke('text')
    .then((text) => {
      if (month !== text) {
        cy.get(nextMonthBtn).should('not.be.disabled').click()
        return iterateMonths(index)
      } else {
        return cy
          .get(dateSelector)
          .invoke('attr', 'class')
          .then((value) => {
            const num = Number(result.dates[0]) + (monthTime.includes('12:00 AM') ? 1 : 0)
            const formattedNum = num.toString().padStart(2, '0')
            const isValidCondition = value === 'rbc-date-cell' || value !== 'rbc-off-range'
            if (isValidCondition) {
              cy.get(dateSelector).contains(formattedNum).click()
            }
          })
      }
    })
}

Cypress.Commands.add('verifyMonth', (freqncy, intervl, futureDate) => {
  const futureDates = calculateAndFormatFutureDates(freqncy, intervl, futureDate)
  result = { dates: futureDates.dates, monthsYears: futureDates.monthsYears }
  return iterateMonths(0)
})

Cypress.Commands.add('verifyChildTicket', (ticketTitle) => {
  cy.get(ticketContainer)
    .should('exist')
    .each(($element) => {
      cy.wrap($element)
        .invoke('text')
        .then((text) => {
          if (text.includes(ticketTitle)) {
            expect(true).to.be.true
          }
        })
    })
})

Cypress.Commands.add('scheduleDay', (intervl) => {
  cy.get(checkboxInSchedule).should('exist').click()
  cy.get(interval)
    .type('{selectAll}' + intervl)
    .should('have.value', intervl)
  cy.contains('Show in inbox').should('exist')
  cy.get(scheduleMonth)
    .eq(2)
    .invoke('text')
    .then((data) => {
      const intervalValue = intervl === 1 ? 'Every day' : `Every ${intervl} days`
      cy.wrap(data).should('include', intervalValue)
    })
  cy.get(time)
    .invoke('attr', 'value')
    .then((value) => {
      dayTime = value
    })
})

function calculateFutureDates(intervalDays, numberOfDates, dayTime) {
  function formatNextDate(nextDate) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const weekday = weekdays[nextDate.getDay()]
    const month = months[nextDate.getMonth()]
    const day = nextDate.getDate()

    const formattedDay = day < 10 ? `0${day}` : `${day}`

    return `${weekday} ${month} ${formattedDay}`
  }

  const currentDate = new Date()
  const dayFutureDates = Array.from({ length: numberOfDates }, (_, i) => {
    const nextDate = new Date(currentDate.getTime() + i * intervalDays * 24 * 60 * 60 * 1000)
    if (dayTime.includes('12:00 AM')) {
      nextDate.setDate(nextDate.getDate() + 1)
    }
    return formatNextDate(nextDate)
  })

  return { dayFutureDates }
}

function iterateDays(index, ticketTitle) {
  if (index >= dayTicketsDates.length) {
    return
  }
  const month = dayTicketsDates[index]
  return cy
    .get(monthInCalendar)
    .invoke('text')
    .then((text) => {
      if (month !== text) {
        cy.get(nextMonthBtn).should('not.be.disabled').click()
        return iterateDays(index, ticketTitle)
      } else {
        return cy
          .get('.MuiCircularProgress-svg')
          .should('exist')
          .then(() => {
            cy.get('.rbc-event-content').then(($eventContent) => {
              if ($eventContent.length > 0) {
                cy.get('.rbc-event-content')
                  .should('exist')
                  .each(($element) => {
                    cy.wrap($element)
                      .invoke('text')
                      .then((text) => {
                        if (text.includes(ticketTitle)) {
                          expect(true).to.be.true
                        }
                      })
                  })
                return iterateDays(index + 1, ticketTitle)
              } else {
                cy.log('No event content found for the current day.')
                return iterateDays(index, ticketTitle)
              }
            })
          })
      }
    })
}

Cypress.Commands.add('verifyDayIntervals', (intervalDays, numberOfDates, ticketTitle) => {
  const { dayFutureDates } = calculateFutureDates(intervalDays, numberOfDates, dayTime)
  dayTicketsDates = dayFutureDates
  cy.get(dayBtn).should('not.be.disabled').click()
  iterateDays(0, ticketTitle)
})

function getNextDates(numIntervals, intervalInWeeks) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDate = new Date()
  const futureDates = []
  for (let i = 1; i < numIntervals; i++) {
    const nextDate = new Date(currentDate.getTime() + i * intervalInWeeks * 7 * 24 * 60 * 60 * 1000)

    const formattedDate = `${
      weekdays[nextDate.getDay()]
    } ${nextDate.getDate()} ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      nextDate,
    )} ${nextDate.getFullYear()}`

    futureDates.push(formattedDate)
  }

  return futureDates
}

function iterateWeeks(index, ticketTitle) {
  if (index >= weekFuturedates.length) {
    return
  }
  const firstDate = weekFuturedates[index]
  const week = firstDate.split(' ').slice(2).join(' ')
  return cy
    .get(monthInCalendar)
    .invoke('text')
    .then((text) => {
      if (week !== text) {
        cy.get(nextMonthBtn).should('not.be.disabled').click()
        return iterateWeeks(index, ticketTitle)
      } else {
        return cy
          .get(dateSelector)
          .invoke('attr', 'class')
          .then((value) => {
            const firstDate = weekFuturedates[index]
            const dayOfMonth = parseInt(firstDate.split(' ')[1], 10)
            const num = dayOfMonth + (weekTime.includes('12:00 AM') ? 1 : 0)
            const formattedNum = num.toString().padStart(2, '0')
            const isValidCondition = value === 'rbc-date-cell' || value !== 'rbc-off-range'
            if (isValidCondition) {
              cy.get(dateSelector).contains(formattedNum).click()
              cy.verifyCalendarPage()
              cy.get('.rbc-agenda-event-cell')
                .should('exist')
                .each(($element) => {
                  cy.wrap($element)
                    .invoke('text')
                    .then((text) => {
                      if (text.includes(ticketTitle)) {
                        expect(true).to.be.true
                      }
                    })
                })
              cy.get(monthBtn).should('not.be.disabled').click()
              return iterateWeeks(index + 1, ticketTitle)
            } else {
              cy.log('No event content found for the current day.')
              return iterateWeeks(index, ticketTitle)
            }
          })
      }
    })
}

Cypress.Commands.add('verifyWeek', (ticketTitle, futureWeeksdates, intervals) => {
  weekFuturedates = getNextDates(futureWeeksdates, intervals)
  iterateWeeks(0, ticketTitle)
})

Cypress.Commands.add('verifyCalendarPage', () => {
  cy.get(nextMonthBtn).should('exist').and('not.be.disabled')
  cy.get(weekBtn).should('exist').and('not.be.disabled')
  cy.get(dayBtn).should('exist').and('not.be.disabled')
  cy.get(backBtn).should('exist').and('not.be.disabled')
  cy.get(todayBtn).should('exist').and('not.be.disabled')
  cy.get(nextMonthBtn).should('exist').and('not.be.disabled')
})
