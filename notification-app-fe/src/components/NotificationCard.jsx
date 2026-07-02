export function NotificationCard({ notification }) {
    return (
        <div>
            <h3>{notification.Type}</h3>
            <p>{notification.Message}</p>
        </div>
    );
}