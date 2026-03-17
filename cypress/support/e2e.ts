// ***********************************************************
// This file runs before every Cypress test
// You can place global configuration and custom commands here
// ***********************************************************

import './commands'

// Ignore uncaught exceptions from the app (optional but useful)
Cypress.on('uncaught:exception', (err) => {
  console.log('Ignoring app error:', err.message)
  return false
})