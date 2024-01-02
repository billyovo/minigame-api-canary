import * as events from "../../../shared/assets/events.json";

type Event = {
    title: string;
    id: string;
    rrule: string;
    emote: string;
}

export class EventsService {
    private events: Map<string, Event>;

    constructor() {
        this.events = new Map<string, Event>();
        this.events.set("all", {
            title: "All",
            id: "all",
            rrule: "",
            emote: "",
        });
        events.forEach((event : Event) => {
          this.events.set(event.id, event);
        });
    }

    getEventNameById(id: string) {
        return this.events.get(id)?.title;
    }
}