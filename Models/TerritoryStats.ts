interface TerritoryStats {
    ObjectID: number;
    Name: string;
    Recovered: number;
    Tests: number;
    LastUpdated: number;
    SourceURL: string;
    ActiveCases: number;
    Hospitalized: number;
    ICU: number;
    ICUVentilator: number;
    Deaths: number;
    CaseTotal: number;
    Vaccinated: number;
}

export default TerritoryStats;