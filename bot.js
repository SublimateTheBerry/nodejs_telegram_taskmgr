const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Токен, полученный от BotFather
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Путь к файлу для хранения задач
const tasksFile = 'tasks.json';

// Максимальная длина задачи
const MAX_TASK_LENGTH = 1024;

// Инициализация файла задач
function initializeTasksFile() {
  if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify({}));
  }
}

// Обработка ошибок
function handleError(chatId, errorMessage) {
  bot.sendMessage(chatId, `Произошла ошибка: ${errorMessage}`);
}

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Добро пожаловать в бот-отслеживатель задач! Используйте команды /add, /list и /remove для управления задачами.');
});

// Команда /add
bot.onText(/\/add (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const task = match[1];
  
  if (task.length > MAX_TASK_LENGTH) {
    bot.sendMessage(chatId, `Задача слишком длинная. Максимальная длина задачи — ${MAX_TASK_LENGTH} символов.`);
    return;
  }

  try {
    const tasks = JSON.parse(fs.readFileSync(tasksFile));
    if (!tasks[chatId]) {
      tasks[chatId] = [];
    }
    tasks[chatId].push(task);
    fs.writeFileSync(tasksFile, JSON.stringify(tasks));
    bot.sendMessage(chatId, `Задача добавлена: "${task}"`);
  } catch (error) {
    handleError(chatId, 'Не удалось добавить задачу.');
  }
});

// Команда /list
bot.onText(/\/list/, (msg) => {
  const chatId = msg.chat.id;
  try {
    const tasks = JSON.parse(fs.readFileSync(tasksFile));
    if (!tasks[chatId] || tasks[chatId].length === 0) {
      bot.sendMessage(chatId, 'У вас нет задач.');
      return;
    }
    const taskList = tasks[chatId].map((task, index) => `${index + 1}. ${task}`).join('\n');
    bot.sendMessage(chatId, `Ваши задачи:\n${taskList}`);
  } catch (error) {
    handleError(chatId, 'Не удалось получить список задач.');
  }
});

// Команда /remove
bot.onText(/\/remove (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const taskIndex = parseInt(match[1], 10) - 1;
  try {
    const tasks = JSON.parse(fs.readFileSync(tasksFile));
    if (!tasks[chatId] || taskIndex < 0 || taskIndex >= tasks[chatId].length) {
      bot.sendMessage(chatId, 'Неверный номер задачи.');
      return;
    }
    const removedTask = tasks[chatId].splice(taskIndex, 1);
    fs.writeFileSync(tasksFile, JSON.stringify(tasks));
    bot.sendMessage(chatId, `Задача удалена: "${removedTask[0]}"`);
  } catch (error) {
    handleError(chatId, 'Не удалось удалить задачу.');
  }
});

// Инициализация
initializeTasksFile();
