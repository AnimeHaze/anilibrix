# AniLibrix Unoffical

### Десктопный аниме-кинотеатр Анилибрии для любого вашего компьютера.

![Anilibrix](https://raw.githubusercontent.com/pavloniym/anilibrix/master/.github/assets/anilibrix.png)

### Особенности не официальной версии (этой):
* Авто пропуск опенинга
* Можно делать резервные копии данных о просмотрах и восстанавливать при необходимости
на другом устройстве, ничего не требуется, все с привязкой к аккаунту
* Кнопка случайного релиза
* Регулировка громкости увеличена с 10 до 20 делений
* При повреждении конфиг файла приложение запускается и
сбрасывает на конфиг по умолчанию (ранее в таком случае оно переставало запускаться)
* Фикс засыпания / выключения экрана пк при просмотре аниме
(у меня он был, выключался экран и блокировало)
*  При переключении видео на следующую серию, переключается
и видео в Picture-in-picture теперь не надо пере открывать этот режим
* Вылетов из аккаунта меньше так как перед деавторизацией делаются попытки
повторной авторизации для обновления сессионного идентификатора
* Discord Rich Presence (трансляция активности просмотра аниме в дискорд)
  - Показывает иконку приложения когда запущено приложение и постер и информацию о просматриваемом релизе:
    - Номер текущей серии
    - Общее кол-во серий
    - Название
    - Ссылка на релиз
    - Ссылка на сайт либрии
    - Сколько осталось времени до конца серии
* Сохранение состояния окна (фулл скрин, минимизация, кординаты на экране)
* Установка кастомного эндпоинта API (адреса API сервера Anilibria) и
кастомного сервера статики (для получения картинок и постеров).
Можно выбрать один из списка или же ввести какой-то свой.
Может быть удобно если кого-то сервер недоступен и заблокирован провайдером.
* Внизу в настройках появилась возможность нажать на кнопку для показа файла конфига
в директории, может быть полезно если требуется перенести данные просмотров
и статистики или сделать резервную копию для переноса на новую систему
* Добавлена функция для перемещения кнопок системного бара в правую часть
(по умолчанию расположение автоматическое)
* Вывод связанных релизов
* Вывод дат выхода в списке эпизодов
* Поддержка rutube релизов в плеере приложения
* Сортировка по популярности в избранном
* Фильтр по "все статусы" в изрбанном и все кроме "в работе"
* Добавлено кол-во у пользователей в избранном (типа рейтинг)
* Вывод статуса в карточке релиза в избранном
* Вывод людей работавших над релизом
* Фильтр уведомлений по избранному
* Постоянное отображение прогресса в избранном разными цветами (в зависиомсти от прогресса)
* Исправлен баг с неверным отображением прогресса когда серии начинаются не с 1
* Исправлен баг с пропаданием из избранного релизов-анонсов

#### Анилибрия — так звучит аниме!

### Горячие клавиши плеера

| Клавиша | Действие                               |
|---------|----------------------------------------|
| F       | Переключение полноэкранного режима     |
| ←       | Назад                                  |
| →       | Вперед                                 |
| ↑       | Громкость больше (или колесиком мышки) |
| ↓       | Громкость меньше (или колесиком мышки) |
| space   | Воспроизведение / пауза                |

Плюс кастомные клавиши на свое усмотрение которые устанавливаются в настроках для:
- Включения выключени автопропуска опенинга не выходя из плеера
- Пропуска опенинга

### Сборка и запуск

> Требуемая верси Node.JS - **14.18.0**
> На других версиях (особенно выше) могут быть проблемы со сборкой нативных модулей
>
> Чертов сраный легаси проще переписать с нуля...

Перед запуском не забудьте скопировать и отредактировать пример `.env` файла:

``` bash
cp .env.example .env
```

``` bash
# Установка и сборка зависимостей
yarn install

# Запуск с горячей перезагрузкой на localhost:9080
yarn run serve

# Сборка production версии
yarn run build

# Запуск ESLint --fix для JS/Vue файлов и компонентов в `src/`
yarn run lint:fix

# Сборка под все платформы
yarn run release

# Сборка под MacOS
yarn run release:mac

# Сборка под Windows
yarn run release:win

# Сборка под Linux
yarn run release:lin
```
