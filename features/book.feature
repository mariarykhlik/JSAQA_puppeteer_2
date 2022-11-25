Feature: Ticket booking
    Scenario: Should book ticket for single
        Given user is on main page
        When user selects day '6'
        And user selects first available seance
        And user selects vacant seat
        Then user books
        And user sees 'Электронный билет'

    Scenario: Should book ticket for several
        Given user is on main page
        When user selects day '6'
        And user selects first available seance
        And user selects vacant seat
        And user selects vacant seat
        And user selects vacant seat
        Then user books
        And user sees 'Электронный билет'

    Scenario: Should not book ticket for no seat select
        Given user is on main page
        When user selects day '6'
        And user selects first available seance
        And user passes select vacant seat
        Then user can not book
