# TicketViewer-Client

Angular Project to render Tickets.

## Getting Started

1. Navigate to root folder of this project and run the following commands from there.
2. Install dependencies
```sh
   npm i
   ```
3. Start the Client.
```sh
   npm start
   ```
After following the above steps your client should be up (http://localhost:4200) and you default browser window will opened. 

## UI Walkthrough

1. After starting the project go to the intial landing page. The tickets will appear in a tabular fashion.
2. Each page will Contain 25 tickets per page. Use the paginator at the bottom of the table to navigate to next/previous page of the table.
3. In order to view the ticket details, simply click the corresponding row. Details will appear as a pop-up. In order to close the dialog, just click anywhere outside the popup.


## Running unit tests

1. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

2. To Generate coverage report run `ng test --code-coverage` the coverage report can be viewed by opening ${project-root}/coverage/index.html file in the browser.


