export interface Tour {
    id: number;
    tourName: string;
    cityFrom: string;
    cityTo: string;
    startDate: string;
    day: number;
    price: number;
    currency: string;
    hotelCategory: number;
    hotelDistance: number;
    flightIncluded: boolean;
    visaIncluded: boolean;
    foodIncluded: boolean;
    transferIncluded: boolean;
    ziyarateIncluded: boolean;
    guideIncluded: boolean;
    isActive: boolean;
    priority: number;
    availableSeats: number;
    typeTour: string;
    imageUrl?: string;
}
