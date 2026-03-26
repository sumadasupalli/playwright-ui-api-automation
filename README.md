# Playwright UI & API Automation

## Overview  
This project contains automated tests for UI and API workflows using **Playwright**. It demonstrates comprehensive test coverage, maintainability, and ease of execution.

## Features  
- Modular and reusable test components  
- Page Object Model (POM) implementation for UI tests  
- Data-driven testing with environment-specific configurations  
- Clear assertions and logging for reliable test results  

## Getting Started  

### Prerequisites  
- Node.js (version 14 or higher)  
- npm or yarn package manager  

### Installation  
1. Clone this repository:  
   git clone https://github.com/sumadasupalli/playwright-ui-api-automation.git
2.Navigate into the project folder:
   cd playwright-ui-api-automation
3.Install dependencies:
    npm install

# Running Tests

To run all tests (UI + API):

npx playwright test

To run UI tests only:

npx playwright test --project=ui
.To run API tests only:
npx playwright test --project=api

## Configuration
Environment variables and test data can be configured in the config folder or as described in your project structure.

## Folder Structure
/tests — test scripts
/pages — page objects for UI automation
/api — API test scripts and helpers
/utils — utility functions

### Notes
Code is commented for clarity and ease of understanding.
Feel free to contact me for any questions or assistance with running/extending the tests.
