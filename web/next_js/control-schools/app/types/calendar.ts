export interface BaseEvent {
    id: string;
    title: string;
    start: string;
    end: string;
}

export interface SchoolClass extends BaseEvent {
    daysOfWeek: number[];
    professor?: string;
    room?: string;
}

export interface ServiceEvent extends BaseEvent {
    description: string;
    clientName?: string;
}