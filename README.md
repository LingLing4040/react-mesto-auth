# react-mesto-auth

В данном проекте реализована интерактивная страница, на которой размещена информация профиля и сетка с картинками. Между разными разрешениями страница ведет себя однородно и адаптивно. Это было достигнуто при помощи резиновой верстки, гридов и медиа-запросов. Информацию профиля можно править. Добавлена возможность добавлять и удалять карточки с фотографиями, а также ставить им лайки. Добавлена валидация форм, закрытие попапов кликом на оверлей и закрытие попапов нажатием на Esc. Это было реализовано с помощью скрипта JS.

В предыдущих версиях страницы был сделан рефакторинг кода: были добавлены классы Section, Popup, PopupWithForm, PopupWithImage и UserInfo. Каждый из них выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится внутри класса. Все классы вынесены в отдельные файлы. Была настроена сборка проекта Вебпаком. Также проект был подключен к серверу: информация о пользователе, его аватар и все карточки загружаются с сервера. Данные пользователя можно редактировать, а карточки можно добавлять, удалять и ставить на них лайки. Это было реализовано с помощью api и асинхронных колбэков.

Проект был портирован на "Реакт". При помощи декларативного и компонентного подходов реализовано монтирование всех элементов страницы, открытие и закрытие попапов, а также возможность редактировать информацию профиля на странице, добавлять и удалять карточки, ставить лайки.

В последней версии страницы были реализованы функции регистрации и авторизации пользователя. Были добавлены два роута: '/sign-up' и '/sign-in'. Основной функционал проекта доступен только авторизованным пользователям по роуту '/'. Это было достигнуто с помощью компонента высокого порядка Protected Route. Также, была настроена работа с локальным хранилищем браузера. При авторизации в нём сохраняется уникальный токен пользователя и используется при работе с сайтом. При повторном визите пользователи не должны вновь авторизовываться.

Адрес сайта: https://cool.domainname.students.nomoredomains.xyz/
