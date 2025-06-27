class AppNotifications {

    private static _instance: AppNotifications; 
    private _newMessages: Notification[] = $state([]);
    private _lastMessage: Notification | null = $state(null);
    private _unreadMessages: Notification[] = $state([]);

    private constructor(){
        this._startToastQueue()
    }

    public static GetInstance(): AppNotifications {
        if (!this._instance) {
            this._instance = new AppNotifications();
        }
        return this._instance;
    }

    public SetMessage(message: string, type: "info" | "error" | "success"){
        const notification = {
            message,
            type,
            read: false,
            showToast: true
        }
        this._newMessages.push(notification);
        this._unreadMessages.push(notification);
    }

    public get Toast(): Notification | null {
        return this._lastMessage;
    }

    public get UnreadMessages(): number {
        return this._unreadMessages.length;
    }

    public get Messages(): Notification[] {
        return this._unreadMessages;
    }


    private async _startToastQueue() {
        const interval = 5000; 
        while (true) {
            await new Promise(resolve => setTimeout(resolve, interval));
            if(this._lastMessage){ 
                this._lastMessage = null;
                continue;
            }
            
            const notification = this._newMessages.shift();
            if (!notification) continue;
            if (!notification.showToast) continue;

            this._lastMessage = notification;
            
        }
    }
}

interface Notification {
    id?: number;
    message: string;
    type: "message" | "error" | "warning" | "info" | "success";
    read: boolean,
    showToast: boolean
    timestamp?: Date;
}

export {AppNotifications}