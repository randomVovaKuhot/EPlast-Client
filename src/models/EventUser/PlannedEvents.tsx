export default class PlannedEvents {
    id: number;
    eventName: string;
    eventDateStart?: Date;
    eventDateEnd?: Date;

    constructor() {
        this.id = 0;
        this.eventName = '';
        this.eventDateStart = undefined;
        this.eventDateEnd = undefined;
    }
}