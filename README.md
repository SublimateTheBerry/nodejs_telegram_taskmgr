# Telegram Task Tracker Bot

A simple Telegram bot built with Node.js for managing tasks. Each user can maintain their own list of tasks, with features to add, list, and remove tasks.

## Features

- **Add tasks**: Use the `/add` command to add a new task to your list.
- **List tasks**: Use the `/list` command to view all your current tasks.
- **Remove tasks**: Use the `/remove` command to delete a task by its number in the list.

## Commands

- **/start**: Start the bot and receive a welcome message with usage instructions.

  Example:
  ```
  /start
  ```

- **/add <task>**: Add a new task to your list. The task description is limited to 1024 characters.

  Example:
  ```
  /add Buy groceries
  ```

- **/list**: List all tasks associated with your account.

  Example:
  ```
  /list
  ```

- **/remove <task_number>**: Remove a task from your list by specifying its number. Task numbers start from 1.

  Example:
  ```
  /remove 2
  ```

## Installation

To set up and run the bot on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/SublimatedBerry/nodejs_telegram_taskmgr.git
   cd nodejs_telegram_taskmgr
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your bot token. Obtain a bot token from [BotFather](https://t.me/botfather) and replace `'YOUR_TELEGRAM_BOT_TOKEN'` in the `bot.js` file with your token:
   ```
   const token = 'YOUR_TELEGRAM_BOT_TOKEN';
   ```

4. Run the bot:
   ```
   node bot.js
   ```

## Data Storage

Tasks are stored in a JSON file named `tasks.json`. This file tracks tasks for each user using their chat ID. Ensure the bot process has write access to this file.

## Limitations

- The maximum length for a task is 1024 characters.
- The current implementation uses a JSON file for data storage, which may not be ideal for high-traffic scenarios. For production use, consider migrating to a database.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
