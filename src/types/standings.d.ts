export interface IConstructorStanding {
    cName: string;
    constructor_id: string;
    emName: string;
    engine_manufacturer_id: string;
    points: number;
    position_display_order: number;
    position_number: number;
    position_text: number;
    year: number;
};

export interface IDriverStanding {
    driver_id: string;
    name: string;
    points: number;
    position_display_order: number;
    position_number: number;
    position_text: string;
    year: number;
};
