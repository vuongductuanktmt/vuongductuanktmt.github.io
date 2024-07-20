import axios from "axios";
import { ENV } from "~/constants/environments";

export class TelegramService {
    private static instance: TelegramService;

    public static getInstance(): TelegramService {
        if (!TelegramService.instance) {
            TelegramService.instance = new TelegramService();
        }

        return TelegramService.instance;
    }

    static sendMessage(message: string, chatId: string) {
        return axios
            .get<{ ok: boolean }>(
                `https://api.telegram.org/bot${ENV.TELEGRAM_BOT_API_KEY}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=html`
            )
    }
}

