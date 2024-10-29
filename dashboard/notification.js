var form = document.getElementById('notification-form');
var notificationList = document.getElementById('notification-list');
var notifications = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var titleInput = document.getElementById('notification-title');
    var contentInput = document.getElementById('notification-content');
    var title = titleInput.value;
    var content = contentInput.value;

    var date = getCurrentDateTime();

    var notification = { id: Date.now(), title: title, content: content, date: date };
    notifications.push(notification);
    renderNotifications();
    form.reset();
});

function getCurrentDateTime() {
    var now = new Date();
    var day = String(now.getDate()).padStart(2, '0');
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var year = now.getFullYear();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function renderNotifications() {
    notificationList.innerHTML = '';
    notifications.forEach(function (notif) {
        var notifCard = document.createElement('div');
        notifCard.className = 'card mb-3';
        notifCard.innerHTML = `
            <div class="card-header d-flex justify-content-between">
                <span>${notif.title}</span>
                <span class="text-muted">${notif.date}</span>
                <div>
                    <button class="btn btn-sm btn-primary" onclick="editNotification(${notif.id})">
                        <i class="fi fi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteNotification(${notif.id})">
                        <i class="fi fi-trash"></i> Deletar
                    </button>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">${notif.content}</p>
            </div>
        `;
        notificationList.appendChild(notifCard);
    });
}

function deleteNotification(id) {
    notifications = notifications.filter(function (notif) { return notif.id !== id; });
    renderNotifications();
}

function editNotification(id) {
    var notif = notifications.find(function (notif) { return notif.id === id; });
    if (notif) {
        var titleInput = document.getElementById('notification-title');
        var contentInput = document.getElementById('notification-content');
        titleInput.value = notif.title;
        contentInput.value = notif.content;
        deleteNotification(id);
    }
}

window.editNotification = editNotification;
window.deleteNotification = deleteNotification;
