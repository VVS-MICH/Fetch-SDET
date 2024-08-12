# Fetch-SDET

## Project Overview

This repository contains automated tests for the [Fetch SDET Challenge](http://sdetchallenge.fetch.com) using Cypress.

The tests cover the following functionalities:

- **Custom Commands:**
  - Clicking on buttons ("Weigh", "Reset")
  - Retrieving measurement results (field between the bowls)
  - Filling out the bowls grids with bar numbers (0 to 8)
  - Retrieving a list of weighings
  - Click on the gold bar number at the bottom of the website and check for the alert message.

- **Algorithm for Finding the Fake Gold Bar:**
  The algorithm implemented finds the fake gold bar using the minimum number of weighings. It works as follows:
  1. **Weighing Process:** Divide the bars into two equal parts and weigh them side by side.
  - If one side is lighter, the fake bar is on the lighter side.
  - If both sides weigh the same, the fake bar is in the remainder.
  - Take the lighter side (or the remainder if equal) and divide it into two equal parts. Repeat the weighing process.
  - Continue until only two bars are left, or an equal weighting is found. The lighter bar or the most recent remainder is the fake bar.

  This algorithm efficiently identifies the fake bar regardless of its position and the number of bars given.

- **Algorithm Implementation:**
  The algorithm is implemented as a cypress test and can be found in the spec file and it incorporates the custom commands previously created to execute properly

  
## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Git

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```sh
   cd <project-directory>
   ```
3. **Install the dependencies:**
   ```sh
   npm install
   ```

### Running Cypress Tests

Cypress tests can be executed in both headless and headed modes. Follow the instructions below:

#### Headless Mode

Run tests without opening the Cypress GUI:

```sh
npx cypress run --headless
```

#### Headed Mode

Run tests with the Cypress GUI open:

```sh
npx cypress run --headed
```
