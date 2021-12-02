# Ticket Viewer Server

Node Server to utilize Zendesk Tickets API.

# Getting Started

1. Navigate to root folder of this project and run the following commands from there.
2. Install dependencies
```sh
   npm i
   ```
3. Start the Server.
```sh
   node .
   ```

After following the above steps your server should be up at port 9000.

## HTTP Verbs


| Verbs        | Methods        | Description|           
| :------------- |:-------------|:------------- |          
| /tickets      | GET |To get all the tickets|   

## Request & Response Examples

### API Resources

  - GET /tickets
  - GET /tickets/{pageNo}

### GET /tickets

Example: http://localhost:9000/tickets

Description: To Get the 1st tickets page

### GET /tickets/{pageNo}

Example: http://localhost:9000/tickets/2

Description: This will get the specified ticket page if it exist else it will return appropiate error.

# Changing Credentials

- This Application uses Zendesk API's Token to access APIs.
- The Credentials are stored in .env file. In order to change Credentials follow the below steps:
1. Generate API token from the Zendesk Admin Center.
2. Replace newely generated token in the following parameter in the .env file.
   ```sh
      TOKEN=OBdXM3Ixstqz4nliwnDaehcYKgNItzs3IotFecHB
      ```
3. Replace the sample email address with the account email address using which token was generated as below in the .env file.
   ```sh
      KEY=sample@email.com/token
      ``` 

