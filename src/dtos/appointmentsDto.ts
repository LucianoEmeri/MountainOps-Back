export enum Status {
    ACTIVE = "Active",
    CANCELED = "Canceled",
    COMPLETED = "Completed"
}

class IAppointmentDto {
    id: number;
    date: string;
    time: string;
    status: Status;
    description: string;
    userId: number;
}

export default IAppointmentDto;
